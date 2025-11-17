# Your Van Feature - Implementation Summary

## Overview
Added a "Your Van" element to the header that displays the currently selected van model from sessionStorage. This appears between the Brand Logo and Search in the header.

## Features Implemented

### 1. Header Display
- Shows selected van model image and name
- Positioned between Brand Logo and Search
- Only visible when a van is selected
- Hidden on mobile (under 990px)

### 2. Van Selection
- Users can click on van models in the Shop megamenu
- Selected model is stored in sessionStorage with key: `selectedVanModel`
- Active state is shown on selected van model link
- Selection persists across page navigation

### 3. Clear Functionality
- Clicking "Your Van" shows a popover
- Popover contains "Clear Your Van" button
- Clearing removes the selection and hides the component
- Removes active state from van model links

## Files Created

### 1. `/snippets/header-your-van.liquid`
- Main component template
- Displays van image, name, and clear popover
- Includes embedded CSS styles
- Contains JSON data structure for van models

### 2. `/assets/header-your-van.js`
- JavaScript class to manage the component
- Handles:
  - Display/hide based on sessionStorage
  - Popover toggle functionality
  - Clear van selection
  - Event listeners for storage changes
  - Custom events (vanModelSelected, vanModelCleared)

## Files Modified

### 1. `/sections/header.liquid`
- Added `capture your_van` block (line ~66)
- Updated header order to include `your_van` in all variations
- Default order now: `'logo,menu,localization,your_van,search,mobile_search,actions'`

### 2. `/snippets/header-row.liquid`
- Added case statement for `'your_van'` (line ~68)
- Renders the your_van component in correct position

### 3. `/blocks/cvc-van-model-menu.liquid`
- Added inline JavaScript to handle van model clicks
- Stores selected model in sessionStorage
- Adds/removes active classes
- Dispatches `vanModelSelected` custom event
- Highlights selected van on page load

## Technical Details

### SessionStorage Key
```javascript
'selectedVanModel'
```
Stores the model ID (e.g., 'model-vw-transporter')

### Custom Events

**vanModelSelected**
- Fired when user selects a van model
- Contains detail: `{ modelId, modelName }`

**vanModelCleared**
- Fired when user clears their van selection

### CSS Classes
- `.header-your-van` - Main container
- `.header-your-van__button` - Clickable trigger
- `.header-your-van__image` - Van model image
- `.header-your-van__model-name` - Display name
- `.header-your-van__popover` - Clear popover
- `.header-your-van__clear-button` - Clear action button

### Data Structure
Van models data is embedded as JSON in the component:
```json
{
  "models": [
    {
      "id": "model-vw-transporter",
      "name": "VW Transporter",
      "image": "https://..."
    }
  ]
}
```

## User Flow

1. User navigates to Shop menu
2. Clicks on a van model in the megamenu
3. Van model is stored in sessionStorage
4. "Your Van" component appears in header with image and name
5. User can click to see clear option
6. Clicking "Clear Your Van" removes selection
7. Component hides until new selection is made

## Browser Support
- Uses sessionStorage (IE8+)
- Custom events (IE9+ with polyfill)
- Modern CSS (CSS Grid, Custom Properties)
- Works with responsive design (hidden on mobile)

## Future Enhancements
- Add van selection to cart/checkout
- Filter products by selected van model
- Show compatible products based on van
- Add van comparison feature
- Sync across devices with account storage
