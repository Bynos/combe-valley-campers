# Fix: Your Van Component Not Updating on Re-selection

## Problem
When a user has already selected a van and then selects a different van, the "Your Van" component in the header doesn't update to show the newly selected van.

## Changes Made

### 1. Enhanced Event Handling (`header-your-van.js`)

**Added delay to ensure sessionStorage is updated:**
```javascript
document.addEventListener('vanModelSelected', (event) => {
  const detail = /** @type {CustomEvent} */ (event).detail;
  console.log('Van model selected event received', detail);
  
  // Reload models in case they weren't available before
  this.vanModels = this.loadVanModelsFromDOM();
  console.log('Reloaded models after selection:', this.vanModels);
  
  // Small delay to ensure sessionStorage is updated
  setTimeout(() => {
    this.updateDisplay();
  }, 50);
});
```

**Why this helps:**
- Adds a 50ms delay to ensure sessionStorage.setItem() completes before reading
- Reloads van models from DOM in case they changed
- Logs the event detail for debugging

### 2. Enhanced Logging in `showComponent()` Method

**Added extensive console logging:**
```javascript
showComponent(vanModel) {
  console.log('Showing component with van model:', vanModel);
  
  this.vanName.textContent = vanModel.name;
  console.log('Updated van name to:', vanModel.name);
  
  if (vanModel.image) {
    this.vanImage.src = vanModel.image;
    console.log('Updated van image to:', vanModel.image);
  }
  
  this.content.style.display = 'block';
  console.log('Component now visible');
}
```

**Benefits:**
- Track every step of the update process
- Confirm the method is being called
- Verify the correct data is being set

### 3. Enhanced Van Selection Logging (`cvc-van-model-menu.liquid`)

**Added comprehensive logging:**
```javascript
vanModelLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    console.log('Van model link clicked:', { modelId, modelName });
    
    sessionStorage.setItem('selectedVanModel', modelId);
    console.log('Stored in sessionStorage:', modelId);
    
    const event = new CustomEvent('vanModelSelected', {
      detail: { modelId, modelName },
      bubbles: true  // ← Added bubbles
    });
    document.dispatchEvent(event);
    
    console.log('Dispatched vanModelSelected event for:', modelName);
  });
});
```

**Improvements:**
- Log when link is clicked
- Confirm sessionStorage write
- Added `bubbles: true` to ensure event propagates
- Confirm event dispatch

## How to Test

### Open Browser Console (F12) and follow these steps:

1. **Initial Selection:**
   ```
   Expected logs:
   ✓ "Van model link clicked: {modelId: 'model-ford-transit', modelName: 'Ford Transit'}"
   ✓ "Stored in sessionStorage: model-ford-transit"
   ✓ "Dispatched vanModelSelected event for: Ford Transit"
   ✓ "Van model selected event received {modelId: 'model-ford-transit', ...}"
   ✓ "Reloaded models after selection: {models: [...]}"
   ✓ "Updating display, selectedModelId: model-ford-transit"
   ✓ "Found van model, showing: {id: 'model-ford-transit', ...}"
   ✓ "Showing component with van model: {id: 'model-ford-transit', ...}"
   ✓ "Updated van name to: Ford Transit"
   ✓ "Updated van image to: [image URL]"
   ✓ "Component now visible"
   ```

2. **Re-selection (Different Van):**
   ```
   Expected logs:
   ✓ "Van model link clicked: {modelId: 'model-peugeot-boxer', modelName: 'Peugeot Boxer'}"
   ✓ "Stored in sessionStorage: model-peugeot-boxer"
   ✓ "Dispatched vanModelSelected event for: Peugeot Boxer"
   ✓ "Van model selected event received {modelId: 'model-peugeot-boxer', ...}"
   ✓ "Reloaded models after selection: {models: [...]}"
   ✓ "Updating display, selectedModelId: model-peugeot-boxer"
   ✓ "Found van model, showing: {id: 'model-peugeot-boxer', ...}"
   ✓ "Showing component with van model: {id: 'model-peugeot-boxer', ...}"
   ✓ "Updated van name to: Peugeot Boxer"
   ✓ "Updated van image to: [new image URL]"
   ✓ "Component now visible"
   ```

3. **Visual Verification:**
   - Component should update immediately
   - Van name should change
   - Van image should change
   - No page reload needed

## Debugging Steps if Still Not Working

### Check 1: Verify sessionStorage
Open console and type:
```javascript
sessionStorage.getItem('selectedVanModel')
```
Should return: `"model-van-name"`

### Check 2: Verify Event Listener
Type in console:
```javascript
document.addEventListener('vanModelSelected', (e) => {
  console.log('TEST: Event received!', e.detail);
});
```
Then click a van model. Should see: `"TEST: Event received!"`

### Check 3: Check Component Elements
Type in console:
```javascript
console.log({
  container: document.getElementById('header-your-van'),
  content: document.getElementById('your-van-content'),
  vanName: document.getElementById('your-van-name'),
  vanImage: document.getElementById('your-van-image')
});
```
All should be valid HTML elements, not `null`

### Check 4: Manual Update Test
Type in console:
```javascript
document.getElementById('your-van-name').textContent = 'TEST VAN';
```
If this works but automatic update doesn't, the issue is in the event flow.

## Common Issues and Solutions

### Issue: Event fires but component doesn't update
**Solution:** Check if multiple instances of the class are created
```javascript
// Add to top of header-your-van.js
if (window.headerYourVanInstance) {
  console.warn('HeaderYourVan already initialized');
  return;
}
window.headerYourVanInstance = true;
```

### Issue: Image doesn't update
**Solution:** Check image caching - may need cache busting
```javascript
this.vanImage.src = vanModel.image + '?t=' + Date.now();
```

### Issue: Delay seems too long
**Solution:** Reduce the 50ms timeout or remove it
```javascript
// Instead of setTimeout(..., 50), try immediate:
this.updateDisplay();
```

## Files Modified

1. `/assets/header-your-van.js`
   - Added 50ms delay in event handler
   - Enhanced logging in showComponent()
   - Added event detail logging

2. `/blocks/cvc-van-model-menu.liquid`
   - Added extensive logging throughout
   - Added `bubbles: true` to CustomEvent
   - Added console.warn for missing modelId

## Expected Behavior After Fix

✅ First selection: Component appears with selected van
✅ Second selection: Component updates instantly to new van
✅ Clear action: Component hides
✅ Third selection: Component reappears with new van
✅ Console shows clear event flow
✅ No errors in console
