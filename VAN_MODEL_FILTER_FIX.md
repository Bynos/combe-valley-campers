# Van Model Filter Fix - Exact Match Filtering

## Problem
Products with multiple Van Models were showing up even when the selected Van Model was NOT in the product's list of Van Models.

### Example of the Issue:
- User selects "VW T5" as their Van Model
- A product has Van Models: ["Mercedes Sprinter", "Ford Transit"]
- The product was incorrectly appearing in the filtered results
- Expected: Product should NOT show because "VW T5" is not in the list

## Root Cause
Two issues were causing this problem:

### 1. Server-Side Filtering (Liquid) - Ambiguous `contains` Operator
**Location:** `sections/main-collection.liquid` (line 70)

**Old Logic:**
```liquid
{% elsif product_van_model contains van_model_filter %}
  {% assign show_product = true %}
{% endif %}
```

**Problem:** The `contains` operator on arrays can have ambiguous behavior when checking if an array contains a specific string value. This wasn't performing strict exact matching.

**New Logic:**
```liquid
{% assign product_has_matching_model = false %}

{% if product_van_model.size > 0 %}
  {% for model in product_van_model %}
    {% if model == van_model_filter %}
      {% assign product_has_matching_model = true %}
      {% break %}
    {% endif %}
  {% endfor %}
{% endif %}

{% if product_has_matching_model %}
  {% assign show_product = true %}
{% endif %}
```

**Fix:** Now explicitly loops through each Van Model in the product's array and performs an **exact match comparison** using `==` operator.

### 2. Client-Side Filtering (JavaScript) - Redundant Filtering
**Location:** `snippets/cvc_van-selector-scripts.liquid`

**Problem:** JavaScript was applying client-side filtering AFTER the server-side filtering had already filtered products via URL reload. This created a conflict where:
- Server-side correctly filtered products via Liquid
- Client-side JavaScript then re-filtered the already filtered results
- Could potentially show/hide products incorrectly

**Fix:** Disabled client-side product filtering on collection and search pages since server-side filtering is already handling it:

```javascript
applyFiltersToPage() {
  // On collection and search pages, server-side filtering via URL parameters is used
  // Client-side filtering is only needed for other pages (like homepage, custom sections)
  const isCollectionOrSearchPage = this.isCollectionOrProductPage() || 
                                    window.location.pathname.includes('/search');
  
  if (!isCollectionOrSearchPage) {
    this.filterProducts();
  }
  
  this.modifySearchForms();
  this.modifyCollectionLinks();
}
```

## Files Modified

### 1. `/sections/main-collection.liquid`
- **Lines 67-88:** Replaced `contains` check with explicit loop and exact match comparison
- **Added:** Explicit loop through `product_van_model` array to check for exact match

### 2. `/sections/search-results.liquid`
- **Lines 18-31:** Added van model filter extraction from URL (same as main-collection)
- **Lines 33-95:** Added same exact match filtering logic for search results
- **Result:** Search results now also respect van model filtering with exact matches

### 3. `/snippets/cvc_van-selector-scripts.liquid`
- **Lines 549-556:** Modified `applyFiltersToPage()` method
- **Added:** Check to skip client-side product filtering on collection/search pages
- **Result:** No conflict between server-side and client-side filtering

## How It Works Now

### Product Filtering Logic:
1. **No Van Model Selected:** All products show
2. **Van Model Selected + Product has NO van_model metafield:** Product shows (universal product)
3. **Van Model Selected + Product HAS van_model metafield:** 
   - Loop through each value in the product's van_model array
   - Check for **exact match** with selected filter
   - Show product ONLY if exact match found

### Example Scenarios:

#### Scenario 1: Universal Product
- **Selected Filter:** "VW T5"
- **Product van_model:** (blank/not set)
- **Result:** ✅ Product SHOWS (universal product)

#### Scenario 2: Exact Match
- **Selected Filter:** "Mercedes Sprinter"
- **Product van_model:** ["Mercedes Sprinter", "Ford Transit"]
- **Result:** ✅ Product SHOWS (exact match found)

#### Scenario 3: No Match (BUG FIX)
- **Selected Filter:** "VW T5"
- **Product van_model:** ["Mercedes Sprinter", "Ford Transit"]
- **Result:** ❌ Product HIDDEN (no exact match - this was broken before)

#### Scenario 4: Single Match
- **Selected Filter:** "VW T5"
- **Product van_model:** ["VW T5"]
- **Result:** ✅ Product SHOWS (exact match)

## Testing Checklist

- [ ] Select a Van Model (e.g., "VW T5")
- [ ] Navigate to a product category
- [ ] Verify only products with "VW T5" OR no van model show
- [ ] Verify products with other van models (e.g., "Mercedes Sprinter" only) do NOT show
- [ ] Verify products with multiple van models including "VW T5" DO show
- [ ] Verify products with multiple van models NOT including "VW T5" do NOT show
- [ ] Test search results page - same filtering should apply
- [ ] Clear van selection - all products should show again
- [ ] Test with different van models to ensure consistent behavior

## Technical Details

### Van Model Metafield Structure:
- **Type:** List of single line text values
- **Key:** `custom.van_model`
- **Example Values:** 
  - `["Mercedes Sprinter"]`
  - `["VW T5", "VW T6"]`
  - `[]` or `blank` (universal products)

### URL Parameter:
- **Parameter:** `van_model`
- **Format:** Exact metafield value (e.g., "Mercedes Sprinter")
- **Example:** `/collections/electrics?van_model=Mercedes%20Sprinter`

### Filtering Method:
- **Collection Pages:** Server-side Liquid filtering with page reload
- **Search Pages:** Server-side Liquid filtering with page reload
- **Other Pages:** Client-side JavaScript filtering (no reload)

## Benefits of This Fix

1. **Accurate Filtering:** Only products that explicitly support the selected van model are shown
2. **Universal Products Still Show:** Products without van model restrictions show for all vans
3. **No False Positives:** Products with multiple van models but NOT the selected one are correctly hidden
4. **Consistent Behavior:** Same filtering logic applied to both collection and search pages
5. **Performance:** Disabled redundant client-side filtering on pages with server-side filtering
6. **Clear Logic:** Explicit loop makes the matching behavior obvious and maintainable

## Date
18 December 2024
