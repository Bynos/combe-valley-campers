# Dynamic Header Menu Implementation Plan

**Date:** 11 November 2025  
**Project:** Combe Valley Campers - Dynamic Header Menu  
**File:** `sections/cvc_header_example.liquid`

---

## Problem Statement

The current header menu has **hardcoded menu items** that do not pull from the Shopify `header-menu` navigation menu. This means:

1. ❌ Menu item titles are hardcoded (`Shop`, `Conversion Guides`, `Start Your Build`)
2. ❌ Users cannot change menu titles in the Shopify admin
3. ❌ Users cannot add/remove top-level menu items
4. ❌ Menu structure is inflexible

**Current Hardcoded Implementation:**

```liquid
{% when 'cvc_van_model_menu' %}
  <li class="cvc-header__menu-item has-megamenu">
    <button class="cvc-header__menu-link">
      Shop  <!-- HARDCODED -->
    </button>
```

---

## Requirements

### 1. Dynamic Menu Titles
- ✅ Pull menu item titles from Shopify `header-menu` navigation
- ✅ If user changes "Conversion Guides" → "Something Else" in admin, it reflects on site
- ✅ Preserve custom megamenu functionality for Shop and Conversion Guides

### 2. Custom Megamenu Blocks (Keep As-Is)
- ✅ **Shop** (`cvc_van_model_menu`) - Keep custom van model grid + categories tabs
- ✅ **Conversion Guides** (`cvc_conversion_guides`) - Keep custom phase columns
- ✅ **Start Your Build** (`cvc_start_build_menu`) - Keep custom content + CTA

### 3. Additional Menu Items
- ✅ Users can add other top-level menu items (e.g., "About Us", "Contact", "Blog")
- ✅ Generic megamenu layout displays child items for non-custom menus
- ✅ Simple dropdown if only 1-3 child links
- ✅ Full megamenu panel if 4+ child links

### 4. Menu Item Matching Strategy
We need to match Shopify menu items to custom block types. Options:

**Option A: Match by Menu Handle** (Recommended)
- Each custom block specifies which menu handle it should display under
- Flexible: menu can be renamed but link handle stays same
- Setting: `menu_handle` (e.g., "shop", "conversion-guides", "start-your-build")

**Option B: Match by Block Order**
- First block = first menu item, second block = second menu item
- Simple but inflexible
- Not recommended

**Option C: Match by Menu Item URL**
- Block specifies URL to match (e.g., `/collections/all`)
- Complex and brittle
- Not recommended

✅ **Selected Strategy: Option A - Match by Menu Handle**

---

## Solution Architecture

### Phase 1: Block Settings Update
Add `menu_handle` setting to each custom block type:

```json
{
  "type": "cvc_van_model_menu",
  "settings": [
    {
      "type": "text",
      "id": "menu_handle",
      "label": "Menu Handle",
      "default": "shop",
      "info": "The handle of the menu item this block should display under (e.g., 'shop', 'conversion-guides')"
    }
  ]
}
```

### Phase 2: Dynamic Menu Loop
Replace hardcoded menu items with dynamic loop:

```liquid
{%- comment -%} Loop through Shopify menu {%- endcomment -%}
{% for menu_item in linklists.header-menu.links %}
  
  {%- comment -%} Find matching custom block {%- endcomment -%}
  {% assign custom_block = null %}
  {% for block in section.blocks %}
    {% if block.settings.menu_handle == menu_item.handle %}
      {% assign custom_block = block %}
      {% break %}
    {% endif %}
  {% endfor %}

  {%- comment -%} Render menu item {%- endcomment -%}
  <li class="cvc-header__menu-item has-megamenu">
    <button class="cvc-header__menu-link">
      {{ menu_item.title }}  <!-- DYNAMIC -->
    </button>
    
    <div class="cvc-header__megamenu-panel">
      {% if custom_block %}
        {%- comment -%} Render custom megamenu {%- endcomment -%}
        {% case custom_block.type %}
          {% when 'cvc_van_model_menu' %}
            {% render 'cvc-van-model-menu', block: custom_block %}
          {% when 'cvc_conversion_guides' %}
            {% render 'cvc-conversion-guides', block: custom_block %}
          {% when 'cvc_start_build_menu' %}
            {% render 'cvc-start-build-menu', block: custom_block %}
        {% endcase %}
      {% else %}
        {%- comment -%} Render generic megamenu {%- endcomment -%}
        {% render 'cvc-generic-megamenu', menu_item: menu_item %}
      {% endif %}
    </div>
  </li>
{% endfor %}
```

### Phase 3: Generic Megamenu Template
Create new snippet: `snippets/cvc-generic-megamenu.liquid`

This handles any menu item that doesn't have a custom block:

```liquid
{%- comment -%}
  Generic Megamenu for non-custom menu items
  Usage: {% render 'cvc-generic-megamenu', menu_item: menu_item %}
{%- endcomment -%}

{% if menu_item.links.size > 0 %}
  <div class="cvc-megamenu">
    <div class="cvc-megamenu__container">
      
      {% if menu_item.links.size <= 3 %}
        {%- comment -%} Simple dropdown for 1-3 items {%- endcomment -%}
        <div class="cvc-megamenu__simple-list">
          {% for child_link in menu_item.links %}
            <a href="{{ child_link.url }}" class="cvc-megamenu__simple-link">
              {{ child_link.title }}
            </a>
          {% endfor %}
        </div>
      
      {% else %}
        {%- comment -%} Full megamenu for 4+ items {%- endcomment -%}
        <div class="cvc-megamenu__grid">
          {% for child_link in menu_item.links %}
            <div class="cvc-megamenu__grid-item">
              <a href="{{ child_link.url }}" class="cvc-megamenu__grid-link">
                {{ child_link.title }}
              </a>
              
              {%- comment -%} Show grandchild links if they exist {%- endcomment -%}
              {% if child_link.links.size > 0 %}
                <ul class="cvc-megamenu__sublist">
                  {% for grandchild_link in child_link.links %}
                    <li>
                      <a href="{{ grandchild_link.url }}" class="cvc-megamenu__sublink">
                        {{ grandchild_link.title }}
                      </a>
                    </li>
                  {% endfor %}
                </ul>
              {% endif %}
            </div>
          {% endfor %}
        </div>
      {% endif %}
      
    </div>
  </div>
{% endif %}
```

### Phase 4: Mobile Drawer Update
Apply same logic to mobile drawer:

```liquid
<nav class="mobile-drawer__nav">
  <ul class="mobile-drawer__menu">
    {% for menu_item in linklists.header-menu.links %}
      
      {%- comment -%} Find matching custom block {%- endcomment -%}
      {% assign custom_block = null %}
      {% for block in section.blocks %}
        {% if block.settings.menu_handle == menu_item.handle %}
          {% assign custom_block = block %}
          {% break %}
        {% endif %}
      {% endfor %}

      <li class="mobile-drawer__menu-item">
        <button class="mobile-drawer__menu-link mobile-drawer__menu-link--parent" 
                data-submenu="{{ menu_item.handle }}">
          {{ menu_item.title }}  <!-- DYNAMIC -->
          <span class="mobile-drawer__arrow">›</span>
        </button>
      </li>
    {% endfor %}
  </ul>
</nav>
```

### Phase 5: Dynamic Submenus
Generate submenus dynamically for mobile:

```liquid
{%- comment -%} Generate submenus for each menu item {%- endcomment -%}
{% for menu_item in linklists.header-menu.links %}
  
  {% assign custom_block = null %}
  {% for block in section.blocks %}
    {% if block.settings.menu_handle == menu_item.handle %}
      {% assign custom_block = block %}
      {% break %}
    {% endif %}
  {% endfor %}

  <div class="mobile-drawer__submenu" id="submenu-{{ menu_item.handle }}" aria-hidden="true">
    <div class="mobile-drawer__submenu-header">
      <button class="mobile-drawer__back" data-back>
        <span class="mobile-drawer__back-arrow">‹</span>
        Back
      </button>
      <h3 class="mobile-drawer__submenu-title">{{ menu_item.title }}</h3>
    </div>

    <div class="mobile-drawer__submenu-content">
      {% if custom_block %}
        {%- comment -%} Custom submenu content {%- endcomment -%}
        {% case custom_block.type %}
          {% when 'cvc_van_model_menu' %}
            {%- comment -%} Tabs and van grid {%- endcomment -%}
            <!-- Existing shop submenu code -->
          
          {% when 'cvc_conversion_guides' %}
            {%- comment -%} Phase list {%- endcomment -%}
            <!-- Existing conversion guides submenu code -->
          
          {% when 'cvc_start_build_menu' %}
            {%- comment -%} Content + CTA {%- endcomment -%}
            <!-- Existing start build submenu code -->
        {% endcase %}
      {% else %}
        {%- comment -%} Generic submenu {%- endcomment -%}
        <div class="mobile-drawer__simple-list">
          {% for child_link in menu_item.links %}
            <a href="{{ child_link.url }}" class="mobile-drawer__link">
              {{ child_link.title }}
            </a>
          {% endfor %}
        </div>
      {% endif %}
    </div>
  </div>
{% endfor %}
```

---

## Implementation Steps

### Step 1: Update Block Schemas (30 min)
Add `menu_handle` setting to:
- `cvc_van_model_menu` block
- `cvc_conversion_guides` block  
- `cvc_start_build_menu` block

**Location:** `{% schema %}` section, inside each block's settings array

### Step 2: Create Generic Megamenu Snippet (45 min)
- Create `snippets/cvc-generic-megamenu.liquid`
- Add styles for `.cvc-megamenu__simple-list`, `.cvc-megamenu__grid`
- Test with sample menu items

### Step 3: Update Desktop Header Navigation (1 hour)
- Replace hardcoded menu loop with dynamic menu loop
- Add custom block matching logic
- Add fallback to generic megamenu
- Test with existing menu items

### Step 4: Update Mobile Drawer Navigation (1 hour)
- Replace hardcoded menu items with dynamic loop
- Update submenu generation to be dynamic
- Update JavaScript to handle dynamic submenu IDs
- Test mobile drawer functionality

### Step 5: Update Mobile Drawer Submenus (1 hour)
- Generate submenus dynamically for each menu item
- Preserve custom submenu content for Shop, Conversion Guides, Start Build
- Add generic submenu for other items
- Test all submenu transitions

### Step 6: Update JavaScript (30 min)
- Ensure submenu IDs are dynamic (based on menu handle)
- Update event listeners to work with dynamic IDs
- Test all interactions

### Step 7: Testing & QA (1 hour)
- Test renaming menu items in Shopify admin
- Test adding new menu items
- Test removing menu items
- Test custom megamenus still work
- Test generic megamenus display correctly
- Test mobile drawer with all scenarios
- Cross-browser testing

---

## Menu Handle Examples

**Shopify Admin Navigation Menu Setup:**

```
header-menu
├── Shop (handle: "shop")
│   ├── All Products
│   ├── New Arrivals
│   └── Best Sellers
├── Conversion Guides (handle: "conversion-guides")
│   ├── Phase 1
│   ├── Phase 2
│   └── ...
├── Start Your Build (handle: "start-your-build")
│   └── Get Started
├── About Us (handle: "about-us")
│   ├── Our Story
│   ├── Team
│   └── Contact
└── Blog (handle: "blog")
```

**Block Settings:**

```
Block 1: cvc_van_model_menu
  - menu_handle: "shop"

Block 2: cvc_conversion_guides
  - menu_handle: "conversion-guides"

Block 3: cvc_start_build_menu
  - menu_handle: "start-your-build"
```

**Result:**
- "Shop" → Custom van model megamenu
- "Conversion Guides" → Custom phase columns megamenu
- "Start Your Build" → Custom content + CTA megamenu
- "About Us" → Generic megamenu (3 links, simple dropdown)
- "Blog" → Direct link (no dropdown if no children)

---

## CSS Updates Required

### Generic Megamenu Styles

```css
/* Generic Megamenu - Simple List (1-3 items) */
.cvc-megamenu__simple-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding: 1.5rem;
  min-width: 200px;
}

.cvc-megamenu__simple-link {
  padding: 0.75rem 1rem;
  text-decoration: none;
  color: var(--color-foreground);
  font-size: 1rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

.cvc-megamenu__simple-link:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #0066cc;
}

/* Generic Megamenu - Grid (4+ items) */
.cvc-megamenu__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

.cvc-megamenu__grid-item {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.cvc-megamenu__grid-link {
  font-size: 1.125rem;
  font-weight: 600;
  color: var(--color-foreground);
  text-decoration: none;
  margin-bottom: 0.5rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid var(--color-foreground);
  transition: color 0.2s ease;
}

.cvc-megamenu__grid-link:hover {
  color: #0066cc;
}

.cvc-megamenu__sublist {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cvc-megamenu__sublink {
  padding: 0.25rem 0;
  color: var(--color-foreground);
  text-decoration: none;
  font-size: 0.95rem;
  transition: color 0.2s ease;
}

.cvc-megamenu__sublink:hover {
  color: #0066cc;
  text-decoration: underline;
}

/* Mobile Generic Submenu */
.mobile-drawer__generic-list {
  display: flex;
  flex-direction: column;
  gap: 0;
  padding: 0.5rem 0;
}

.mobile-drawer__generic-link {
  padding: 0.875rem 1.25rem;
  border-bottom: 1px solid #f5f5f5;
  text-decoration: none;
  color: #333;
  font-size: 1rem;
  transition: background-color 0.2s ease;
}

.mobile-drawer__generic-link:hover,
.mobile-drawer__generic-link:active {
  background-color: rgba(0, 0, 0, 0.02);
}

/* Responsive */
@media (max-width: 768px) {
  .cvc-megamenu__grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 1.5rem;
  }
}
```

---

## JavaScript Updates Required

### Update Menu Opening Logic

```javascript
// Menu item clicks - open submenus
menuLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const submenuHandle = link.dataset.submenu; // Now uses menu handle
    const submenuId = 'submenu-' + submenuHandle;
    openSubmenu(submenuId);
  });
});
```

### No other JS changes needed
The existing JavaScript already uses `data-submenu` attribute, which we'll populate with the menu handle dynamically.

---

## Testing Scenarios

### Scenario 1: Rename Menu Item
**Action:** In Shopify admin, rename "Conversion Guides" → "Build Guides"  
**Expected:** Header shows "Build Guides" (desktop + mobile)  
**Custom megamenu:** Still displays phase columns correctly

### Scenario 2: Add New Menu Item
**Action:** Add "Resources" menu with child links: FAQ, Videos, Downloads  
**Expected:** 
- Desktop: Shows "Resources" with simple dropdown (3 items)
- Mobile: Shows "Resources" with submenu containing 3 links

### Scenario 3: Remove Menu Item
**Action:** Delete "Start Your Build" from menu  
**Expected:** Menu item disappears from header (desktop + mobile)

### Scenario 4: Reorder Menu Items
**Action:** Move "Blog" to be first menu item  
**Expected:** Menu items reorder to match admin settings

### Scenario 5: Add Menu with Many Children
**Action:** Add "Products" menu with 10 child categories  
**Expected:** 
- Desktop: Shows full megamenu grid (not simple dropdown)
- Mobile: Shows submenu with scrollable list

### Scenario 6: Nested Menu Items
**Action:** Create "Products" → "Category A" → "Subcategory 1"  
**Expected:** 
- Desktop: Megamenu shows "Category A" with subcategories underneath
- Mobile: Shows nested structure

---

## Backward Compatibility

### Existing Installations
For sites already using this header:

1. **Block Settings Migration:**
   - Default `menu_handle` values should match current hardcoded handles:
     - `cvc_van_model_menu` → `menu_handle: "shop"`
     - `cvc_conversion_guides` → `menu_handle: "conversion-guides"`
     - `cvc_start_build_menu` → `menu_handle: "start-your-build"`

2. **Menu Setup Required:**
   - Users must ensure their `header-menu` has items with these handles
   - Or update block settings to match their menu handles

3. **Documentation:**
   - Provide migration guide
   - Explain menu handle matching system
   - Show how to add new menu items

---

## Benefits

### ✅ For Users
- Change menu titles without touching code
- Add/remove menu items easily
- Control menu order from Shopify admin
- Same workflow as other Shopify themes

### ✅ For Developers
- More maintainable code
- Follows Shopify best practices
- Easier to extend with new menu items
- Generic megamenu works for all future additions

### ✅ For Business
- Faster content updates
- No developer needed for menu changes
- Better user experience
- More flexible marketing campaigns

---

## Risks & Mitigation

### Risk 1: Breaking Changes
**Risk:** Existing menus might not match new handle-based system  
**Mitigation:** Default handles match current hardcoded values

### Risk 2: User Confusion
**Risk:** Users might not understand menu handle concept  
**Mitigation:** Clear documentation + sensible defaults

### Risk 3: Performance
**Risk:** Looping through blocks for each menu item  
**Mitigation:** Menu items are typically 3-7 items, performance impact minimal

### Risk 4: JavaScript Compatibility
**Risk:** Dynamic submenu IDs might break existing JS  
**Mitigation:** Use same `data-submenu` attribute pattern, just with dynamic values

---

## Documentation Requirements

### User Guide Needed:
1. **Setting Up Menu Handles**
   - How to find menu item handle in Shopify
   - How to set custom block menu_handle setting
   - Matching strategy explanation

2. **Adding New Menu Items**
   - Step-by-step with screenshots
   - How generic megamenu works
   - When to create custom block vs use generic

3. **Troubleshooting**
   - Menu item not showing → Check handle matching
   - Wrong megamenu displaying → Verify block settings
   - Styling issues → CSS customization guide

---

## Future Enhancements

After this implementation, consider:

1. **Visual Menu Builder**
   - Drag-and-drop interface in theme customizer
   - Live preview of menu changes
   - No need to understand handles

2. **Megamenu Templates**
   - Pre-built layouts (grid, list, image grid)
   - User selects template per menu item
   - More flexible than custom blocks

3. **Conditional Display**
   - Show certain menu items only to logged-in users
   - Hide menu items based on tags
   - A/B testing menu structures

4. **Analytics Integration**
   - Track which menu items are clicked
   - Optimize menu based on user behavior
   - Heatmap of megamenu interactions

---

## Estimated Timeline

| Phase | Task | Time | Dependencies |
|-------|------|------|--------------|
| 1 | Update block schemas | 30 min | - |
| 2 | Create generic megamenu snippet | 45 min | - |
| 3 | Update desktop header | 1 hour | Phase 2 |
| 4 | Update mobile drawer | 1 hour | Phase 3 |
| 5 | Update mobile submenus | 1 hour | Phase 4 |
| 6 | Update JavaScript | 30 min | Phase 5 |
| 7 | Testing & QA | 1 hour | All phases |
| 8 | Documentation | 1 hour | Phase 7 |
| **Total** | | **7 hours** | |

---

## Implementation Checklist

### Pre-Implementation
- [ ] Backup current `cvc_header_example.liquid`
- [ ] Document current menu structure in Shopify admin
- [ ] Note current menu item handles
- [ ] Create test menu items for QA

### Implementation
- [ ] Add `menu_handle` to `cvc_van_model_menu` block schema
- [ ] Add `menu_handle` to `cvc_conversion_guides` block schema
- [ ] Add `menu_handle` to `cvc_start_build_menu` block schema
- [ ] Create `snippets/cvc-generic-megamenu.liquid`
- [ ] Add generic megamenu CSS
- [ ] Update desktop menu loop to be dynamic
- [ ] Update mobile drawer menu loop to be dynamic
- [ ] Update mobile drawer submenu generation
- [ ] Update JavaScript submenu handling
- [ ] Test menu renaming
- [ ] Test adding new menu items
- [ ] Test removing menu items
- [ ] Test reordering menu items
- [ ] Test custom megamenus still work
- [ ] Test generic megamenus
- [ ] Cross-browser testing
- [ ] Mobile device testing

### Post-Implementation
- [ ] Create user documentation
- [ ] Update implementation guide
- [ ] Deploy to staging
- [ ] Client approval
- [ ] Deploy to production
- [ ] Monitor for issues

---

## Success Criteria

Implementation is successful when:

1. ✅ Menu item titles pull from Shopify `header-menu`
2. ✅ Changing menu title in admin updates site immediately
3. ✅ Custom megamenus (Shop, Conversion Guides, Start Build) still work
4. ✅ New menu items display with generic megamenu
5. ✅ Mobile drawer reflects menu changes
6. ✅ All interactions work (hover, click, back button)
7. ✅ No console errors
8. ✅ Performance is unchanged
9. ✅ Works across all browsers/devices
10. ✅ User can manage menu without developer

---

**Ready to implement?** Follow the steps above, testing after each phase. Document any issues or deviations from the plan.

---

*Dynamic Header Menu Plan prepared for Combe Valley Campers - November 11, 2025*
