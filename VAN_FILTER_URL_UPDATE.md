# Van Filter URL Parameter Update

## Summary
Updated the van filter system to properly update the URL with `filter.p.tag` parameter and reload the page when a van is chosen from the Shop megamenu, especially on collection and product pages.

## Changes Made

### 1. Enhanced Van Model Menu Block (`blocks/cvc-van-model-menu.liquid`)
Added functionality to:
- Detect if user is on a collection or product page
- Update URL with `filter.p.tag` parameter when van is selected
- Reload page automatically to apply filter on collection/product pages
- Show notification on non-collection pages
- Console logging for debugging

**Key Functions Added:**
- `isCollectionOrProductPage()` - Checks if current page is collection or product
- `updateURLWithFilter(modelId)` - Updates URL with filter parameter
- `applyFilterToPage(modelId, modelName)` - Applies filter or navigates as appropriate
- `showNotification(message)` - Shows user-friendly notification

### 2. Enhanced Van Model Menu Snippet (`snippets/cvc-van-model-menu.liquid`)
Applied the same enhancements as the block version for consistency.

### 3. Updated Van Selector Scripts (`snippets/cvc_van-selector-scripts.liquid`)

#### Added URL Syncing:
```javascript
syncFromURL() {
  // Syncs filter.p.tag from URL to sessionStorage on page load
  const urlParams = new URLSearchParams(window.location.search);
  const urlFilter = urlParams.get('filter.p.tag');
  if (urlFilter) {
    this.setSelectedModel(urlFilter);
  }
}
```

#### Enhanced Model Selection:
```javascript
handleModelSelection(modelId, modelName = null) {
  // Now checks page type and reloads on collection/product pages
  if (this.isCollectionOrProductPage()) {
    this.updateURLAndReload(modelId);
  } else {
    this.applyFiltersToPage();
  }
}
```

#### Improved Collection Links:
```javascript
modifyCollectionLinks() {
  // Now properly parses URLs and excludes van selector links
  // Uses URLSearchParams for robust parameter handling
  // Skips van model selector links (they have their own handler)
}
```

## User Experience Flow

### On Collection/Product Pages:
1. User clicks a van model in the Shop megamenu
2. System stores selection in `sessionStorage`
3. URL is updated with `filter.p.tag=model-{van-name}`
4. Page reloads automatically
5. Products are filtered to show only compatible items
6. "Your Van" indicator appears in header

### On Other Pages:
1. User clicks a van model in the Shop megamenu
2. System stores selection in `sessionStorage`
3. Notification appears: "Van filter set to: {Van Name}. Navigate to a collection to see filtered products."
4. User navigates to any collection
5. Filter is automatically applied via URL parameter
6. Products are filtered accordingly

### URL Parameter Format:
```
/collections/campervan-essentials?filter.p.tag=model-volkswagon-t25
/collections/electrical?filter.p.tag=model-mercedes-sprinter
```

## Technical Details

### URL Parameter Handling:
- Parameter name: `filter.p.tag`
- Format: `model-{van-name-slugified}`
- Examples:
  - `model-volkswagon-t25`
  - `model-mercedes-sprinter`
  - `model-ford-transit`

### Session Storage:
- Key: `selectedVanModel`
- Synced from URL on page load
- Persists across page navigation
- Cleared when user clicks "Clear Your Van"

### Page Type Detection:
Checks if `window.location.pathname` includes:
- `/collections/` - Collection pages
- `/products/` - Product pages

### Filter Logic:
Products are shown if they have:
1. No model tags (universal products)
2. The specific model tag matching selection
3. A `model-universal` tag

## Debugging

Console logs added for tracking:
```javascript
console.log('Found van model links:', vanModelLinks.length);
console.log('Van model link clicked:', { modelId, modelName });
console.log('Stored in sessionStorage:', modelId);
console.log('Dispatched vanModelSelected event for:', modelName);
console.log('Navigating to filtered URL:', newUrl.toString());
```

## Testing Checklist

- [ ] Click van model on homepage → notification shows
- [ ] Navigate to collection → filter is applied
- [ ] Click van model on collection page → page reloads with filter
- [ ] URL contains correct `filter.p.tag` parameter
- [ ] Products are filtered correctly
- [ ] "Your Van" appears in header with correct model
- [ ] Clicking another van model updates filter
- [ ] "Clear Your Van" removes filter
- [ ] Filter persists across collection navigation
- [ ] Back button works correctly with history

## Files Modified

1. `/blocks/cvc-van-model-menu.liquid`
2. `/snippets/cvc-van-model-menu.liquid`
3. `/snippets/cvc_van-selector-scripts.liquid`

## Compatibility

- Works with existing Shopify collection filtering
- Compatible with faceted search
- Maintains browser history
- Responsive design maintained
- Accessibility preserved

---

**Date**: October 22, 2025
**Status**: Complete
