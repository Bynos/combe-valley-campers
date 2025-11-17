# CVC Header Mobile View Optimization Plan

**Date:** 23 October 2025  
**Section:** `cvc_header_example.liquid`  
**Current Status:** Basic mobile styles exist but need significant optimization

---

## Current State Analysis

### Desktop Layout (>768px)
- **Structure:** 3-column grid layout (`1fr auto 1fr`)
  - Left: Navigation menu (Shop, Conversion Guides, Start Your Build)
  - Center: Logo (280px wide, 80px tall, min 180px)
  - Right: Utilities (Your Van, Search, Account, Cart)
- **Header Height:** 80px (fixed via CSS variable `--cvc-header-height`)
- **Container Padding:** 2rem (32px) horizontal
- **Gap Between Columns:** 2rem (32px)
- **Utilities Gap:** 1rem (16px) between icons

### Current Mobile Styles (@media max-width: 768px)
```css
.cvc-header__container {
  grid-template-columns: 1fr;
  grid-template-rows: auto auto auto;
  gap: 1rem;
  padding: 1rem;
}
```

**Order on Mobile:**
1. Logo (centered)
2. Navigation (centered)
3. Utilities (centered)

### Critical Space Issues Identified

#### 1. **Excessive Padding/Margins**
- Container padding: `1rem` (16px) - could be reduced to 0.5rem (8px)
- Grid gap: `1rem` (16px) - could be reduced to 0.5rem (8px)
- Menu item padding: `0 1.25rem` (20px horizontal) - too much for mobile
- Utility icons: `50px × 50px` - could be 40px × 40px on mobile
- Logo min-height: `80px` on desktop, `40px` on mobile - reasonable but header height isn't responsive

#### 2. **Logo Space Issues**
- Desktop: `min-width: 180px`, `max-width: 280px`, `min-height: 40px`, `max-height: 80px`
- Mobile: Only `max-height: 40px` is specified
- Logo container has `min-height: 80px` which forces extra vertical space

#### 3. **Navigation Menu Problems**
- Desktop megamenu opens in fixed full-width panel
- Mobile: Menu items stack vertically but still use desktop interaction (hover)
- No hamburger menu implemented
- Megamenu on mobile becomes static (no hover on mobile)

#### 4. **Shop Megamenu Structure**
The Shop megamenu has **2 distinct sections**:
- **Left Column:** Van model image grid (19 van models with images/placeholders)
- **Right Column:** Text links from `header-menu` linklist (Shop submenu items)

**Current Grid Layout:**
```css
.cvc-megamenu__content--two-column {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 3rem;
}
```

**Mobile (768px):**
```css
.cvc-megamenu__content--two-column {
  grid-template-columns: 1fr;
  gap: 2rem;
}
```

---

## Mobile Optimization Recommendations

### Priority 1: Space Reduction

#### Header Container
```css
@media (max-width: 768px) {
  .cvc-header__container {
    padding: 0.5rem 0.75rem; /* Reduce from 1rem */
    gap: 0.5rem; /* Reduce from 1rem */
    min-height: 60px; /* Reduce from 80px */
  }
  
  body:has(.cvc-header) {
    --cvc-header-height: 60px; /* Update CSS variable */
  }
}
```

#### Logo Optimization
```css
@media (max-width: 768px) {
  .cvc-header__logo {
    min-height: 50px; /* Reduce from 80px */
    padding: 0.25rem 0;
  }
  
  .cvc-header__logo-image {
    max-height: 35px !important; /* Reduce from 40px */
    max-width: 160px !important; /* Add max width */
    min-width: 120px !important; /* Reduce from 180px */
    min-height: 30px !important; /* Reduce from 40px */
  }
}
```

#### Utility Icons
```css
@media (max-width: 768px) {
  .cvc-header__utilities {
    gap: 0.5rem; /* Reduce from 1rem */
  }
  
  .cvc-header__search-toggle,
  .cvc-header__account-link,
  .cvc-header__cart-link {
    width: 40px; /* Reduce from 50px */
    height: 40px;
  }
  
  .cvc-header__search-icon,
  .cvc-header__account-icon,
  .cvc-header__cart-icon {
    width: 24px !important; /* Reduce from 28px */
    height: 24px !important;
  }
}
```

#### Menu Item Padding
```css
@media (max-width: 768px) {
  .cvc-header__menu-link {
    padding: 0 0.75rem; /* Reduce from 1.25rem */
    font-size: 0.9rem; /* Reduce from 1rem */
    min-height: 44px; /* Maintain touch target */
  }
}
```

---

### Priority 2: Shop Megamenu Mobile Solutions

The Shop megamenu's dual-section structure (van images + text links) presents a challenge in limited mobile space. Here are **5 options** ranging from simple to complex:

---

#### **Option 1: Accordion/Tabs Approach** ⭐ RECOMMENDED
**Concept:** Split the two sections into tabs or accordion panels

**Implementation:**
```html
<!-- Mobile version of Shop megamenu -->
<div class="cvc-megamenu-mobile-tabs">
  <div class="tab-buttons">
    <button class="tab-btn active" data-tab="vans">Van Models</button>
    <button class="tab-btn" data-tab="categories">Shop By Category</button>
  </div>
  
  <div class="tab-content active" id="tab-vans">
    <!-- Van model grid (3-4 columns) -->
  </div>
  
  <div class="tab-content" id="tab-categories">
    <!-- Text links list -->
  </div>
</div>
```

**CSS:**
```css
@media (max-width: 768px) {
  .cvc-megamenu-mobile-tabs {
    display: block;
  }
  
  .tab-buttons {
    display: flex;
    gap: 0;
    border-bottom: 2px solid #e0e0e0;
    margin-bottom: 1rem;
  }
  
  .tab-btn {
    flex: 1;
    padding: 0.75rem;
    border: none;
    background: transparent;
    font-weight: 500;
    cursor: pointer;
    border-bottom: 3px solid transparent;
  }
  
  .tab-btn.active {
    border-bottom-color: #0066cc;
    color: #0066cc;
  }
  
  .tab-content {
    display: none;
  }
  
  .tab-content.active {
    display: block;
  }
  
  /* Van grid - 3 columns on mobile */
  .cvc-megamenu__images {
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    max-height: 50vh;
  }
}
```

**Pros:**
- Clear separation of content types
- User chooses what they want to see
- Saves vertical space
- Easy to implement

**Cons:**
- Requires JavaScript for tab switching
- Adds one extra tap for users

---

#### **Option 2: Vertical Stack with Collapsible Sections**
**Concept:** Stack both sections vertically with collapse/expand controls

**Implementation:**
```html
<div class="cvc-megamenu-mobile">
  <details class="mobile-section" open>
    <summary>Shop By Van Model</summary>
    <div class="mobile-section-content">
      <!-- Van grid (2-3 columns, compressed) -->
    </div>
  </details>
  
  <details class="mobile-section">
    <summary>Shop By Category</summary>
    <div class="mobile-section-content">
      <!-- Text links -->
    </div>
  </details>
</div>
```

**CSS:**
```css
@media (max-width: 768px) {
  .mobile-section {
    border-top: 1px solid #e0e0e0;
    padding: 0.75rem 0;
  }
  
  .mobile-section summary {
    font-weight: 600;
    padding: 0.5rem;
    cursor: pointer;
    list-style: none;
  }
  
  .mobile-section summary::after {
    content: '▼';
    float: right;
    transition: transform 0.2s;
  }
  
  .mobile-section[open] summary::after {
    transform: rotate(180deg);
  }
  
  .mobile-section-content {
    padding-top: 0.75rem;
  }
  
  /* Van grid - 2 columns for more compact view */
  .cvc-megamenu__images {
    grid-template-columns: repeat(2, 1fr);
    gap: 0.5rem;
  }
}
```

**Pros:**
- Native HTML `<details>` element (no JS needed)
- Shows both sections by default
- Progressive disclosure

**Cons:**
- Takes more vertical space if both expanded
- May require scrolling

---

#### **Option 3: Drawer/Hamburger Menu** 🔥 BEST FOR FULL MOBILE EXPERIENCE
**Concept:** Hide all navigation behind a hamburger menu, use full-screen drawer

**Implementation:**
```html
<!-- Mobile header -->
<div class="cvc-header-mobile">
  <button class="hamburger-btn" aria-label="Menu">
    <span class="hamburger-icon"></span>
  </button>
  
  <div class="cvc-header__logo"><!-- Logo --></div>
  
  <div class="cvc-header__utilities"><!-- Icons --></div>
</div>

<!-- Drawer (slides from left) -->
<div class="mobile-drawer" id="mobile-menu-drawer">
  <div class="drawer-header">
    <button class="close-btn">✕</button>
  </div>
  
  <nav class="drawer-nav">
    <ul class="drawer-menu">
      <li>
        <button class="drawer-menu-btn">Shop ›</button>
        <!-- Shop submenu slides in -->
      </li>
      <li><a href="#">Conversion Guides</a></li>
      <li><a href="#">Start Your Build</a></li>
    </ul>
  </nav>
</div>
```

**CSS:**
```css
@media (max-width: 768px) {
  /* Hide desktop nav */
  .cvc-header__nav--left {
    display: none;
  }
  
  /* Single row header */
  .cvc-header__container {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr;
    padding: 0.5rem 0.75rem;
    min-height: 56px;
  }
  
  .hamburger-btn {
    width: 40px;
    height: 40px;
    padding: 8px;
    border: none;
    background: none;
  }
  
  /* Drawer */
  .mobile-drawer {
    position: fixed;
    top: 0;
    left: -100%;
    width: 85%;
    max-width: 320px;
    height: 100vh;
    background: white;
    z-index: 9999;
    transition: left 0.3s ease;
    box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    overflow-y: auto;
  }
  
  .mobile-drawer.open {
    left: 0;
  }
  
  /* Backdrop */
  .drawer-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0,0,0,0.5);
    z-index: 9998;
    display: none;
  }
  
  .drawer-backdrop.visible {
    display: block;
  }
  
  /* Shop submenu in drawer */
  .shop-submenu {
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    background: white;
    transition: left 0.3s ease;
  }
  
  .shop-submenu.open {
    left: 0;
  }
}
```

**JavaScript (essential):**
```javascript
const hamburger = document.querySelector('.hamburger-btn');
const drawer = document.querySelector('.mobile-drawer');
const backdrop = document.querySelector('.drawer-backdrop');
const closeBtn = document.querySelector('.close-btn');

hamburger.addEventListener('click', () => {
  drawer.classList.add('open');
  backdrop.classList.add('visible');
  document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
  drawer.classList.remove('open');
  backdrop.classList.remove('visible');
  document.body.style.overflow = '';
});
```

**For Shop Submenu in Drawer:**
- Use tabs (Option 1) or vertical stack (Option 2) within drawer
- Van grid: 2 columns in drawer for better visibility
- Text links: Simple vertical list

**Pros:**
- Industry standard mobile pattern
- Maximum screen space for content
- Clean, minimal header
- Best UX for mobile users

**Cons:**
- Most complex to implement
- Requires significant JavaScript
- Need to integrate with existing Shopify drawer system

---

#### **Option 4: Compact Horizontal Scroll for Vans + Dropdown for Categories**
**Concept:** Show vans in horizontal scroll carousel, categories in dropdown

**Implementation:**
```html
<div class="cvc-megamenu-mobile-hybrid">
  <!-- Van carousel -->
  <div class="van-carousel-wrapper">
    <h4>Shop By Van Model</h4>
    <div class="van-carousel">
      <!-- Van items scroll horizontally -->
      <a href="#" class="van-item">
        <img src="..." alt="VW Caddy">
        <span>VW Caddy</span>
      </a>
      <!-- More vans... -->
    </div>
  </div>
  
  <!-- Category dropdown -->
  <div class="category-dropdown">
    <button class="dropdown-toggle">Shop Categories ▼</button>
    <ul class="dropdown-menu">
      <!-- Text links -->
    </ul>
  </div>
</div>
```

**CSS:**
```css
@media (max-width: 768px) {
  .van-carousel {
    display: flex;
    gap: 0.75rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding: 0.5rem 0;
    -webkit-overflow-scrolling: touch;
  }
  
  .van-item {
    flex: 0 0 80px;
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
  }
  
  .van-item img {
    width: 70px;
    height: 50px;
    object-fit: contain;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  .van-item span {
    font-size: 0.7rem;
    margin-top: 0.25rem;
    text-align: center;
  }
  
  .category-dropdown {
    margin-top: 1rem;
  }
  
  .dropdown-toggle {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    background: white;
    text-align: left;
  }
}
```

**Pros:**
- Shows van visual previews immediately
- Space-efficient for many items
- Familiar mobile pattern (horizontal scroll)

**Cons:**
- Van labels may be too small
- Horizontal scroll can be awkward
- Category dropdown adds complexity

---

#### **Option 5: Priority Navigation - Show Top Items Only**
**Concept:** Show only most popular vans/categories, hide rest behind "More" button

**Implementation:**
```html
<div class="cvc-megamenu-mobile-priority">
  <!-- Top 6 vans visible -->
  <div class="priority-vans">
    <h4>Popular Van Models</h4>
    <div class="van-grid-compact">
      <!-- 6 most popular vans in 3×2 grid -->
    </div>
    <button class="show-all-btn">See All 19 Van Models ›</button>
  </div>
  
  <!-- Top 4 categories visible -->
  <div class="priority-categories">
    <h4>Shop Categories</h4>
    <ul class="category-list-compact">
      <!-- 4 main categories -->
    </ul>
    <button class="show-all-btn">See All Categories ›</button>
  </div>
</div>
```

**CSS:**
```css
@media (max-width: 768px) {
  .van-grid-compact {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 0.5rem;
    margin-bottom: 0.75rem;
  }
  
  .priority-categories {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e0e0e0;
  }
  
  .category-list-compact {
    list-style: none;
    padding: 0;
  }
  
  .category-list-compact li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f0f0f0;
  }
  
  .show-all-btn {
    width: 100%;
    padding: 0.75rem;
    background: #f5f5f5;
    border: 1px solid #ddd;
    color: #0066cc;
    font-weight: 500;
  }
}
```

**Pros:**
- Reduces cognitive load
- Focuses on popular items
- Clean, organized appearance
- No complex interactions needed

**Cons:**
- Requires data on what's "popular"
- "See All" requires modal or new page
- May hide important options

---

## Shop Megamenu Options Summary Table

| Option | Complexity | Space Saved | UX Quality | Dev Time | Recommended For |
|--------|-----------|-------------|------------|----------|-----------------|
| **1. Tabs** | Low | High | ⭐⭐⭐⭐ | 2-3 hours | Quick wins, maintains desktop functionality |
| **2. Collapsible** | Very Low | Medium | ⭐⭐⭐ | 1-2 hours | Minimal dev time, HTML-only solution |
| **3. Drawer** | High | Highest | ⭐⭐⭐⭐⭐ | 8-12 hours | Best mobile UX, professional sites |
| **4. Horizontal Scroll** | Medium | Medium | ⭐⭐⭐ | 4-6 hours | Visual-heavy catalogs |
| **5. Priority Nav** | Low | Medium | ⭐⭐⭐⭐ | 3-4 hours | Data-driven sites with analytics |

---

## Priority 3: Conversion Guides Mobile

The Conversion Guides megamenu uses a 5-column layout on desktop which becomes 1 column on mobile. This is already responsive but can be improved:

### Current Mobile Implementation
```css
@media (max-width: 768px) {
  .cvc-megamenu__content--five-column {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }
}
```

### Recommendations

#### Option A: Accordion Phases (Space-Saving)
```css
@media (max-width: 768px) {
  .cvc-phase-column {
    border-top: 1px solid #e0e0e0;
  }
  
  .cvc-phase-column details summary {
    padding: 0.75rem 0.5rem;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
  }
  
  .cvc-phase-column__links {
    padding: 0.5rem 0.5rem 0.75rem;
  }
  
  .cvc-phase-column__link {
    padding: 0.4rem 0.5rem;
    font-size: 0.95rem;
  }
}
```

#### Option B: Keep Stacked but Reduce Spacing
```css
@media (max-width: 768px) {
  .cvc-megamenu__content--five-column {
    grid-template-columns: 1fr;
    gap: 1rem; /* Reduce from 1.5rem */
  }
  
  .cvc-phase-column__title {
    font-size: 1rem; /* Reduce from 1.125rem */
    margin-bottom: 0.5rem; /* Reduce from 1rem */
    padding-bottom: 0.35rem;
  }
  
  .cvc-phase-column__link {
    font-size: 0.95rem; /* Reduce from 1.1rem */
    padding: 0.2rem 0; /* Reduce from 0.25rem */
  }
  
  .cvc-phase-column__links {
    gap: 0;
  }
}
```

---

## Priority 4: Start Your Build Mobile

This megamenu has text content + feature cards. Current mobile implementation is basic.

### Recommendations

```css
@media (max-width: 768px) {
  .cvc-start-build-features {
    grid-template-columns: 1fr; /* Single column */
    gap: 1rem;
  }
  
  .feature-card {
    padding: 1rem; /* Reduce if needed */
  }
  
  .feature-card__icon {
    font-size: 2rem; /* Reduce from 3rem if needed */
  }
  
  /* CTA button */
  .cvc-start-build-cta {
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
  }
}
```

---

## Priority 5: Mobile Header Layout Options

### Current: 3-Row Stacked (Logo → Nav → Utilities)

**Issues:**
- Takes too much vertical space
- Nav menu not practical on mobile (no touch interaction for megamenus)
- Doesn't follow mobile-first design patterns

### Recommended: Single-Row with Hamburger

```
┌─────────────────────────────────────────┐
│  ☰   [LOGO]              🔍 👤 🛒      │
└─────────────────────────────────────────┘
```

**Layout:**
```css
@media (max-width: 768px) {
  .cvc-header {
    position: sticky;
    top: 0;
  }
  
  .cvc-header__container {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr;
    align-items: center;
    padding: 0.5rem 0.75rem;
    gap: 0.75rem;
    min-height: 56px;
  }
  
  /* Hamburger menu */
  .cvc-header__hamburger {
    order: 1;
    justify-self: start;
  }
  
  /* Logo */
  .cvc-header__logo {
    order: 2;
    justify-self: center;
  }
  
  /* Utilities */
  .cvc-header__utilities {
    order: 3;
    justify-self: end;
  }
  
  /* Hide desktop nav */
  .cvc-header__nav--left {
    display: none;
  }
}
```

---

## Implementation Phases

### Phase 1: Quick Wins (1-2 hours)
1. Reduce padding and margins across header
2. Reduce logo size constraints
3. Reduce utility icon sizes
4. Adjust header height to 56-60px

### Phase 2: Shop Megamenu (3-12 hours depending on option)
**Recommended: Start with Option 1 (Tabs) or Option 2 (Collapsible)**
1. Implement tab switching or details/summary
2. Adjust van grid to 2-3 columns
3. Style text links section
4. Test touch interactions

### Phase 3: Complete Mobile Navigation (8-12 hours)
**If going with full drawer approach (Option 3):**
1. Create hamburger button
2. Build drawer component
3. Implement slide-in animations
4. Add backdrop/overlay
5. Handle submenu navigation
6. Test on various mobile devices

### Phase 4: Polish & Optimize (2-4 hours)
1. Adjust Conversion Guides spacing
2. Optimize Start Your Build layout
3. Add touch-friendly interactions
4. Test on real devices
5. Performance optimization

---

## Breakpoint Strategy

Recommended breakpoints:
```css
/* Small phones */
@media (max-width: 390px) {
  /* Extra compact styles */
  .cvc-header__logo-image {
    max-width: 120px !important;
    max-height: 30px !important;
  }
  
  .cvc-header__utilities {
    gap: 0.25rem;
  }
  
  .cvc-megamenu__images {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Standard mobile */
@media (max-width: 768px) {
  /* Current mobile styles */
}

/* Large phones / small tablets */
@media (min-width: 769px) and (max-width: 1024px) {
  /* Transition styles - maybe 2 columns for vans */
  .cvc-megamenu__images {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Desktop */
@media (min-width: 1025px) {
  /* Current desktop styles */
}
```

---

## Touch Target Guidelines

All interactive elements should meet minimum touch target size:
- **Minimum:** 44px × 44px (iOS guideline)
- **Recommended:** 48px × 48px (Material Design)

**Current issues:**
- Menu links: Variable height (based on text)
- Van model links: Images are various sizes

**Solutions:**
```css
@media (max-width: 768px) {
  /* Ensure all tap targets are minimum 44px */
  .cvc-header__menu-link,
  .cvc-header__search-toggle,
  .cvc-header__account-link,
  .cvc-header__cart-link,
  .cvc-van-model-link,
  .cvc-phase-column__link {
    min-height: 44px;
    min-width: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
```

---

## Performance Considerations

### Mobile Performance
1. **Lazy load van images:** Only load visible van images
   ```html
   <img loading="lazy" src="..." alt="...">
   ```

2. **Reduce megamenu panel weight:** Don't load all megamenu content on page load
   ```javascript
   // Load megamenu content on first interaction
   ```

3. **Optimize animations:** Use `transform` and `opacity` only
   ```css
   .mobile-drawer {
     transition: transform 0.3s ease;
     will-change: transform;
   }
   ```

4. **Prevent layout shift:** Reserve space for images with aspect-ratio
   ```css
   .cvc-van-model-link img {
     aspect-ratio: 3/2;
   }
   ```

---

## Testing Checklist

### Devices to Test
- [ ] iPhone SE (375px width - smallest common)
- [ ] iPhone 12/13/14 (390px)
- [ ] iPhone 14 Pro Max (430px)
- [ ] iPad Mini (768px)
- [ ] Android phone (various)

### Interactions to Test
- [ ] Tap all menu items
- [ ] Scroll megamenus
- [ ] Select van models
- [ ] Use search, account, cart icons
- [ ] Scroll page with sticky header
- [ ] Test in portrait and landscape
- [ ] Test with accessibility tools (VoiceOver, TalkBack)

### Visual Checks
- [ ] Logo doesn't overflow
- [ ] Icons are visible and sized correctly
- [ ] Text is readable (minimum 14px font size)
- [ ] Touch targets are large enough
- [ ] No horizontal scrolling
- [ ] Adequate whitespace
- [ ] Consistent spacing

---

## Accessibility Notes

1. **Hamburger button needs proper ARIA:**
   ```html
   <button 
     class="hamburger-btn" 
     aria-label="Open menu"
     aria-expanded="false"
     aria-controls="mobile-menu-drawer"
   >
   ```

2. **Drawer needs focus management:**
   - Trap focus within drawer when open
   - Return focus to hamburger when closed

3. **Megamenu tabs need ARIA:**
   ```html
   <button role="tab" aria-selected="true" aria-controls="panel-vans">
   ```

4. **Skip link for keyboard users:**
   ```html
   <a href="#main-content" class="skip-link">Skip to main content</a>
   ```

---

## Final Recommendation

**Best Approach for Quick Implementation:**
1. Start with **Space Reduction** (Priority 1) - immediate impact
2. Implement **Tabs for Shop Megamenu** (Option 1) - good UX, moderate effort
3. Keep Conversion Guides stacked with reduced spacing
4. **Future enhancement:** Migrate to full hamburger drawer (Option 3)

**Best Approach for Optimal Mobile UX:**
1. Implement **Hamburger Drawer** (Option 3) from the start
2. Use tabs within drawer for Shop megamenu
3. Full mobile-first redesign with proper touch interactions
4. Will take longer but provides best user experience

---

## Code Snippets Location

All changes should be made in:
- **File:** `/sections/cvc_header_example.liquid`
- **Section:** Within the existing `<style>` block, add new `@media` queries
- **JavaScript:** Add within existing `<script>` block or create new `assets/cvc-header-mobile.js`

---

## Estimated Time Investment

| Task | Time Estimate |
|------|--------------|
| Space reduction (Priority 1) | 1-2 hours |
| Shop megamenu - Tabs (Option 1) | 2-3 hours |
| Shop megamenu - Drawer (Option 3) | 8-12 hours |
| Conversion Guides optimization | 1-2 hours |
| Full mobile header refactor | 4-6 hours |
| Testing & polish | 2-4 hours |
| **Total (Quick approach):** | **6-11 hours** |
| **Total (Full drawer approach):** | **17-29 hours** |

---

## Next Steps

1. **Decide on approach:** Quick wins vs. full mobile redesign
2. **Choose Shop megamenu solution:** Review options 1-5
3. **Create mobile prototype:** Test on devices before full implementation
4. **Gather user feedback:** If possible, test with real users
5. **Implement in phases:** Don't do everything at once
6. **Monitor analytics:** Track mobile engagement after changes

---

*Document prepared for Combe Valley Campers mobile optimization project.*
