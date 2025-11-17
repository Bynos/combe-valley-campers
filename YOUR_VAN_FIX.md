# Your Van Component - Fixes Applied

## Problem
The "Your Van" element was not appearing in the header when a van was selected.

## Root Cause
1. The component was added to the standard `header.liquid` section
2. The standard header section is **disabled** in `header-group.json`
3. The active header is `cvc_header_example.liquid`
4. The component was trying to access `section.blocks` which wasn't available in a snippet context

## Fixes Applied

### 1. Updated `snippets/header-your-van.liquid`
- **Removed** the JSON script tag that tried to access `section.blocks`
- **Simplified** to just render the HTML structure
- **Fixed** image tag with proper width/height attributes and placeholder SVG
- Component now gets van model data from DOM elements instead

### 2. Updated `assets/header-your-van.js`
- **Changed** `loadVanModelsData()` to `loadVanModelsFromDOM()`
- Now extracts van model data from `.cvc-van-model-link--image` elements in the DOM
- **Added** retry logic with 500ms delay if models aren't found initially
- **Added** extensive console logging for debugging
- **Reloads** van models when `vanModelSelected` event is triggered

### 3. Added Component to CVC Header
- **File**: `sections/cvc_header_example.liquid`
- **Added** `{% render 'header-your-van' %}` in the utilities section
- **Position**: Between the logo and search button (in the right utilities area)

## How It Works Now

1. **Van Model Selection**:
   - User clicks van model in Shop megamenu
   - JavaScript stores `selectedVanModel` in sessionStorage
   - Dispatches `vanModelSelected` custom event

2. **Component Initialization**:
   - `header-your-van.js` loads on page
   - Queries DOM for all `.cvc-van-model-link--image[data-model-id]` elements
   - Extracts van model data (id, name, image) from these elements
   - If no models found, retries after 500ms

3. **Display Update**:
   - Checks sessionStorage for `selectedVanModel`
   - Finds matching van model from loaded data
   - Updates image and name in the component
   - Shows the component with `display: block`

4. **Clear Functionality**:
   - User clicks "Your Van" button → popover appears
   - User clicks "Clear Your Van" → removes from sessionStorage
   - Component hides and active states are removed

## Testing Checklist

✅ Van model links are present in the DOM with data attributes
✅ Component renders in CVC header utilities section
✅ JavaScript loads van models from DOM
✅ Selecting a van stores in sessionStorage
✅ Component appears when van is selected
✅ Component shows correct van name and image
✅ Click to show clear popover
✅ Clear button removes selection and hides component

## Console Debugging

The component now logs extensively:
- "Loaded van models from DOM: [...]" - Shows found models
- "Updating display, selectedModelId: ..." - Shows current selection
- "Available models: [...]" - Shows what's available to match
- "Found van model, showing: {...}" - Confirms match and display
- "Van model selected event received" - Confirms event handling

## File Locations

- Component HTML: `/snippets/header-your-van.liquid`
- Component JavaScript: `/assets/header-your-van.js`
- Van selection JS: `/blocks/cvc-van-model-menu.liquid` (inline script)
- Header integration: `/sections/cvc_header_example.liquid` (line ~88)
