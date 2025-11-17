# CRITICAL BUG: All Text is Invisible (Font-Size: 0px)

## Problem Summary
**ALL text on the website is invisible because font-size is set to 0px.**

## Root Cause
The theme's `snippets/theme-styles-variables.liquid` generates CSS variables like:
- `--font-h1--size`
- `--font-h2--size`
- `--font-h3--size`
- `--font-paragraph--size`

These variables are calculated from Shopify theme settings:
- `settings.type_size_h1`
- `settings.type_size_h2`
- `settings.type_size_paragraph`
- etc.

**BUT these settings DO NOT EXIST in `config/settings_data.json`!**

## Current State
All CSS variables are set to `0.0rem`:
```css
:root {
  --font-h1--size: 0.0rem;  /* Should be ~3rem */
  --font-h2--size: 0.0rem;  /* Should be ~2rem */
  --font-h3--size: 0.0rem;  /* Should be ~1.5rem */
  --font-paragraph--size: 0.0rem;  /* Should be ~1rem */
}
```

## Evidence
See screenshots in `/screenshots/`:
- `01-password-page-initial-load.png` - Page is almost completely blank
- `02-password-page-scrolled-down.png` - Same issue after scrolling

## Required Fix
Add these settings to `config/settings_data.json`:

```json
{
  "current": {
    "type_size_paragraph": 16,
    "type_size_h1": 48,
    "type_size_h2": 36,
    "type_size_h3": 28,
    "type_size_h4": 24,
    "type_size_h5": 20,
    "type_size_h6": 18,
    "type_line_height_paragraph": "body-normal",
    "type_line_height_h1": "heading-tight",
    "type_line_height_h2": "heading-tight",
    "type_line_height_h3": "heading-normal",
    "type_line_height_h4": "heading-normal",
    "type_line_height_h5": "heading-normal",
    "type_line_height_h6": "heading-normal",
    "type_font_h1": "heading",
    "type_font_h2": "heading",
    "type_font_h3": "heading",
    "type_font_h4": "heading",
    "type_font_h5": "heading",
    "type_font_h6": "heading",
    "type_case_h1": "none",
    "type_case_h2": "none",
    "type_case_h3": "none",
    "type_case_h4": "none",
    "type_case_h5": "none",
    "type_case_h6": "none",
    "type_letter_spacing_h1": "heading-normal",
    "type_letter_spacing_h2": "heading-normal",
    "type_letter_spacing_h3": "heading-normal",
    "type_letter_spacing_h4": "heading-normal",
    "type_letter_spacing_h5": "heading-normal",
    "type_letter_spacing_h6": "heading-normal"
  }
}
```

## Impact
- **Password page**: Completely broken - users cannot see text
- **All other pages**: Likely affected (need to test after password is removed)
- **Welcome and Reviews section**: Will also be affected by this bug

## Priority
**CRITICAL** - The website is unusable in its current state.
