# Debugging Guide: Your Van Component Not Working

## Issue
- No console logs when choosing a van model
- "Your Van" component doesn't appear
- Selecting a different van doesn't update the component

## Fix Applied

### Added JavaScript to Snippet File
The JavaScript for handling van model selection was in the **block** file (`blocks/cvc-van-model-menu.liquid`), but the CVC header actually uses the **snippet** file (`snippets/cvc-van-model-menu.liquid`).

**Fixed**: Added the complete JavaScript to `/snippets/cvc-van-model-menu.liquid`

### Enhanced Logging Throughout

#### 1. Van Model Menu Script Logs:
```
✓ "Van model menu loaded. Found van model links: 2"
✓ "Page loaded with selected van: model-ford-transit" (if one was previously selected)
✓ "No van currently selected in sessionStorage" (if none selected)
✓ "Van model link clicked: {modelId: '...', modelName: '...'}"
✓ "Stored in sessionStorage: model-..."
✓ "Added active class to: Van Name"
✓ "Dispatched vanModelSelected event for: Van Name"
```

#### 2. Header Your Van Script Logs:
```
✓ "header-your-van.js: Script loaded, readyState: loading"
✓ "header-your-van.js: DOM already ready, creating instance immediately..."
✓ "HeaderYourVan: Initializing..."
✓ "HeaderYourVan: Elements found: {container: true, content: true, ...}"
✓ "Loaded van models from DOM: {models: [...]}"
✓ "Updating display, selectedModelId: model-..."
✓ "Found van model, showing: {...}"
✓ "Showing component with van model: {...}"
✓ "Updated van name to: Van Name"
✓ "Updated van image to: https://..."
✓ "Component now visible"
```

## Testing Steps

### Step 1: Check if Files are Loading
Open browser console (F12) and refresh the page. You should see:

```
header-your-van.js: Script loaded, readyState: ...
Van model menu loaded. Found van model links: X
```

If you DON'T see these logs:
- ❌ The JavaScript files aren't loading
- Check: Is the snippet being rendered?
- Check: Are there any JavaScript errors?

### Step 2: Click a Van Model
Click on a van model image in the Shop menu. You should see:

```
Van model link clicked: {modelId: "model-ford-transit", modelName: "Ford Transit"}
Stored in sessionStorage: model-ford-transit
Added active class to: Ford Transit
Dispatched vanModelSelected event for: Ford Transit
Van model selected event received {modelId: "model-ford-transit", ...}
Reloaded models after selection: {models: [...]}
Updating display, selectedModelId: model-ford-transit
Found van model, showing: {id: "model-ford-transit", ...}
Showing component with van model: {...}
Updated van name to: Ford Transit
Updated van image to: https://...
Component now visible
```

### Step 3: Visual Check
After clicking a van model:
- ✅ "Your Van" component should appear in header
- ✅ Should show van name
- ✅ Should show van image
- ✅ Should be between logo and search icon

## Manual Console Tests

### Test 1: Check if van links exist
```javascript
document.querySelectorAll('.cvc-van-model-link--image').length
```
Should return: `2` (or number of van models you have)

### Test 2: Check van link data
```javascript
document.querySelectorAll('.cvc-van-model-link--image').forEach(link => {
  console.log({
    id: link.getAttribute('data-model-id'),
    name: link.getAttribute('data-model-name')
  });
});
```
Should show all van models with their IDs and names

### Test 3: Manual selection
```javascript
sessionStorage.setItem('selectedVanModel', 'model-ford-transit');
document.dispatchEvent(new CustomEvent('vanModelSelected', {
  detail: { modelId: 'model-ford-transit', modelName: 'Ford Transit' },
  bubbles: true
}));
```
Should trigger the component to appear

### Test 4: Check component exists
```javascript
console.log({
  component: document.getElementById('header-your-van'),
  content: document.getElementById('your-van-content'),
  name: document.getElementById('your-van-name'),
  image: document.getElementById('your-van-image')
});
```
All should be HTML elements, not `null`

### Test 5: Force show component
```javascript
const content = document.getElementById('your-van-content');
if (content) {
  content.style.display = 'block';
  document.getElementById('your-van-name').textContent = 'TEST VAN';
}
```
Should make component visible with "TEST VAN" text

## Common Issues & Solutions

### Issue: No console logs at all
**Cause**: JavaScript files not loading
**Solution**: 
1. Check browser Network tab for 404 errors
2. Verify files exist in `/assets/` folder
3. Check if there are JavaScript syntax errors preventing execution

### Issue: "Van model menu loaded" shows 0 links
**Cause**: Van model HTML not rendering
**Solution**:
1. Check if van models are configured in section blocks
2. Verify `section.blocks` has van_model entries
3. Check header-group.json for van model blocks

### Issue: Logs show van selected but component doesn't appear
**Cause**: Component HTML not rendered or CSS hiding it
**Solution**:
1. Check if snippet is being rendered in CVC header
2. Check CSS - component might be `display: none` from other rules
3. Verify component HTML IDs match JavaScript selectors

### Issue: Component appears but doesn't update
**Cause**: Event not propagating or timing issue
**Solution**:
1. Check event listener is attached
2. Verify `bubbles: true` on CustomEvent
3. Try increasing setTimeout delay from 50ms to 100ms

## File Checklist

✅ `/snippets/cvc-van-model-menu.liquid` - Has JavaScript for van selection
✅ `/assets/header-your-van.js` - Has component logic
✅ `/snippets/header-your-van.liquid` - Has component HTML
✅ `/sections/cvc_header_example.liquid` - Renders header-your-van snippet
✅ All files have console.log statements for debugging

## Expected Console Output (Complete Flow)

```
1. Page Load:
   header-your-van.js: Script loaded, readyState: interactive
   header-your-van.js: DOM already ready, creating instance immediately...
   HeaderYourVan: Initializing...
   HeaderYourVan: Elements found: {container: true, content: true, ...}
   Loaded van models from DOM: {models: [2 items]}
   Van model menu loaded. Found van model links: 2
   No van currently selected in sessionStorage
   
2. Click Van Model:
   Van model link clicked: {modelId: "model-ford-transit", modelName: "Ford Transit"}
   Stored in sessionStorage: model-ford-transit
   Added active class to: Ford Transit
   Dispatched vanModelSelected event for: Ford Transit
   Van model selected event received {modelId: "model-ford-transit", modelName: "Ford Transit"}
   Reloaded models after selection: {models: Array(2)}
   Updating display, selectedModelId: model-ford-transit
   Available models: Array(2)
   Found van model, showing: {id: "model-ford-transit", name: "Ford Transit", image: "https://..."}
   Showing component with van model: {id: "model-ford-transit", ...}
   Updated van name to: Ford Transit
   Updated van image to: https://...
   Component now visible
```

If you see all these logs, everything is working! 🎉
