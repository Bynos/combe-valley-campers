# Dark Mode Icons Implementation for CVC Header

## Overview
Added functionality to upload and display separate icons for dark mode in the CVC Header section. The system automatically switches between light and dark mode icons based on the user's device color scheme preference.

## Changes Made

### 1. New Settings Added
The following dark mode icon upload fields have been added to the CVC Header section settings:

- **Brand Logo (Dark Mode)** - `logo_dark`
- **Search Icon Dark Mode (SVG)** - `search_icon_dark`
- **Account Icon Dark Mode (SVG)** - `account_icon_dark`
- **Cart Icon Dark Mode (SVG)** - `cart_icon_dark`

### 2. Icon Rendering Logic
Each icon now renders both light and dark versions with CSS classes:
- Light mode icons have class: `--light` (e.g., `cvc-header__logo-image--light`)
- Dark mode icons have class: `--dark` (e.g., `cvc-header__logo-image--dark`)

### 3. CSS Dark Mode Detection
Added CSS media query to automatically switch icons based on device preference:

```css
/* By default, show light mode icons and hide dark mode icons */
.cvc-header__logo-image--dark,
.cvc-header__search-icon--dark,
.cvc-header__account-icon--dark,
.cvc-header__cart-icon--dark {
  display: none !important;
}

/* When device is in dark mode, reverse the visibility */
@media (prefers-color-scheme: dark) {
  .cvc-header__logo-image--light,
  .cvc-header__search-icon--light,
  .cvc-header__account-icon--light,
  .cvc-header__cart-icon--light {
    display: none !important;
  }

  .cvc-header__logo-image--dark,
  .cvc-header__search-icon--dark,
  .cvc-header__account-icon--dark,
  .cvc-header__cart-icon--dark {
    display: block !important;
  }
}
```

## How to Use

### In Shopify Theme Editor:

1. Navigate to **Customize** > **CVC Header with Megamenus** section
2. Under **Header Settings**, you'll find:
   - **Brand Logo** - Upload your standard logo
   - **Brand Logo (Dark Mode)** - Upload your dark mode logo (optional)
3. Under **Custom Icons**, you'll find pairs of upload fields:
   - **Search Icon (SVG)** + **Search Icon Dark Mode (SVG)**
   - **Account Icon (SVG)** + **Account Icon Dark Mode (SVG)**
   - **Cart Icon (SVG)** + **Cart Icon Dark Mode (SVG)**

### Behavior:

- **Light Mode Icons Only**: If you only upload light mode icons, they will display in both light and dark mode
- **Both Modes**: If you upload both light and dark mode versions, the system will automatically switch between them based on the user's device preference
- **Fallback**: If no custom icons are uploaded, the default SVG icons will display

## Technical Details

### File Modified
- `/sections/cvc_header_example.liquid`

### Automatic Switching
The icon switching is completely automatic and uses the CSS `@media (prefers-color-scheme: dark)` query. This means:
- No JavaScript required
- Instant switching when user changes system preferences
- Works on all modern browsers
- No additional server requests

### Mobile Responsiveness
Dark mode switching works consistently across all screen sizes, including mobile devices.

## Browser Support
The `prefers-color-scheme` media query is supported in:
- Chrome 76+
- Firefox 67+
- Safari 12.1+
- Edge 79+
- iOS Safari 13+
- Chrome Android 76+

Older browsers will simply show the light mode icons as a fallback.

## Testing
To test dark mode functionality:
1. **macOS**: System Preferences > General > Appearance > Dark
2. **Windows 10/11**: Settings > Personalization > Colors > Choose your color > Dark
3. **iOS**: Settings > Display & Brightness > Dark
4. **Android**: Settings > Display > Dark theme

The icons should automatically switch when you change your system's color scheme preference.
