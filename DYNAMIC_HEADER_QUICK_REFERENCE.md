# Dynamic Header Menu - Quick Reference

## What Changed

The header menu now **pulls menu items dynamically from Shopify's navigation menu** instead of hardcoded values.

## Files Modified

1. **`sections/cvc_header_example.liquid`** - Updated header navigation logic
2. **`snippets/cvc-generic-megamenu.liquid`** - NEW snippet for non-custom menu items

## Key Features

### ✅ Dynamic Menu Titles
Menu titles now come from Shopify admin, not hardcoded in Liquid.

### ✅ Menu Handle Matching
Each custom block has a `menu_handle` setting that matches it to a Shopify menu item:
- `cvc_van_model_menu` → matches menu item with handle `shop`
- `cvc_conversion_guides` → matches menu item with handle `conversion-guides`
- `cvc_start_build_menu` → matches menu item with handle `start-your-build`

### ✅ Generic Megamenu
New menu items automatically get a generic megamenu:
- **1-3 child links** = Simple dropdown
- **4+ child links** = Grid layout with nested support

### ✅ Custom Megamenus Preserved
Shop, Conversion Guides, and Start Your Build keep their custom layouts.

## How to Use

### Change a Menu Title
1. Shopify Admin → Navigation → header-menu
2. Click menu item to edit
3. Change "Navigation label"
4. Save

**Result:** Title updates immediately on site

### Add a New Menu Item
1. Shopify Admin → Navigation → header-menu
2. Add menu item
3. Add child links if needed

**Result:** Appears with generic megamenu automatically

### Match Custom Block to Menu Item
1. Theme Customizer → Header section
2. Click on custom block (e.g., "Van Model Megamenu")
3. Find "Menu Handle" setting
4. Enter the handle of your menu item (e.g., `shop`)
5. Save

**The handle must match exactly** - you can find a menu item's handle by looking at its URL structure or using Shopify's handle generator.

## Menu Handle Examples

If your menu item is named "Shop", its handle is typically `shop`.  
If it's "Conversion Guides", the handle is typically `conversion-guides`.

Handles are:
- Lowercase
- Spaces become hyphens
- Special characters removed

## Testing Checklist

- [ ] Menu items display from Shopify navigation ✓
- [ ] Menu titles are dynamic (not hardcoded) ✓
- [ ] Custom megamenus work (Shop, Conversion Guides, Start Build) ✓
- [ ] Generic megamenus work for new menu items ✓
- [ ] Mobile drawer displays dynamic menu items ✓
- [ ] Mobile submenus work correctly ✓
- [ ] No console errors ✓

## Deployment

```bash
shopify theme push
```

Then verify in your Shopify admin that:
1. Menu items appear correctly
2. Custom megamenus still work
3. New menu items get generic megamenus

## Support

See detailed documentation:
- **Plan:** `DYNAMIC_HEADER_MENU_PLAN.md`
- **Summary:** `DYNAMIC_HEADER_IMPLEMENTATION_SUMMARY.md`

---

**Status:** ✅ Complete and ready for deployment
