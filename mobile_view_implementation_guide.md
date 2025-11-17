# CVC Header Mobile Implementation Guide

**Date:** 23 October 2025  
**Project:** Combe Valley Campers Mobile Header Optimization  
**File:** `sections/cvc_header_example.liquid`

---

## Implementation Strategy

This guide implements:
- ✅ **Priority 1**: All space reduction recommendations
- ✅ **Single-row hamburger menu** on mobile
- ✅ **Option 3: Drawer menu** with Shop megamenu tabs (links panel active by default)
- ✅ **Conversion Guides**: Simple list with horizontal separators
- ✅ **Start Your Build**: Simplified minimal version

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Space Reduction](#phase-1-space-reduction)
3. [Phase 2: Mobile Header Structure](#phase-2-mobile-header-structure)
4. [Phase 3: Hamburger Button](#phase-3-hamburger-button)
5. [Phase 4: Mobile Drawer](#phase-4-mobile-drawer)
6. [Phase 5: Shop Megamenu with Tabs](#phase-5-shop-megamenu-with-tabs)
7. [Phase 6: Conversion Guides Simplification](#phase-6-conversion-guides-simplification)
8. [Phase 7: Start Your Build Simplification](#phase-7-start-your-build-simplification)
9. [Phase 8: JavaScript Implementation](#phase-8-javascript-implementation)
10. [Testing Checklist](#testing-checklist)

---

## Prerequisites

### Backup Current File
```bash
cp sections/cvc_header_example.liquid sections/cvc_header_example.liquid.backup
```

### Test Environment
- Test on Shopify development theme first
- Have mobile device or Chrome DevTools ready
- Clear browser cache between tests

---

## Phase 1: Space Reduction

**Time Estimate:** 30 minutes  
**Location:** Inside `<style>` block, within existing `@media (max-width: 768px)` section

### Step 1.1: Update Mobile Header Container

**Find this section (around line 558):**
```css
@media (max-width: 768px) {
  .cvc-header__container {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 1rem;
    padding: 1rem;
  }
```

**Replace with:**
```css
@media (max-width: 768px) {
  /* Mobile: Single row layout */
  .cvc-header__container {
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr;
    align-items: center;
    gap: 0.75rem;
    padding: 0.5rem 0.75rem;
    min-height: 56px;
  }
```

### Step 1.2: Adjust Header Height CSS Variable

**Find this section (around line 163):**
```css
body:has(.cvc-header) {
  --cvc-header-height: 80px;
}
```

**Add mobile override in the `@media (max-width: 768px)` section:**
```css
@media (max-width: 768px) {
  body:has(.cvc-header) {
    --cvc-header-height: 56px;
  }
```

### Step 1.3: Reduce Logo Size

**Find in `@media (max-width: 768px)` (around line 579):**
```css
.cvc-header__logo-image {
  max-height: 40px;
}
```

**Replace with:**
```css
.cvc-header__logo {
    min-height: 50px;
    padding: 0.25rem 0;
    justify-self: center;
  }

  .cvc-header__logo-image {
    max-height: 35px !important;
    max-width: 160px !important;
    min-width: 100px !important;
    min-height: 28px !important;
  }
```

### Step 1.4: Reduce Utility Icon Sizes

**Add to `@media (max-width: 768px)` section:**
```css
.cvc-header__utilities {
    gap: 0.5rem;
    justify-self: end;
  }

  .cvc-header__search-toggle,
  .cvc-header__account-link,
  .cvc-header__cart-link {
    width: 40px;
    height: 40px;
  }

  .cvc-header__search-icon,
  .cvc-header__account-icon,
  .cvc-header__cart-icon,
  .cvc-header__search-toggle img,
  .cvc-header__account-link img,
  .cvc-header__cart-link img {
    width: 22px !important;
    height: 22px !important;
    min-width: 22px !important;
    min-height: 22px !important;
  }
```

### Step 1.5: Adjust Menu Item Padding

**Add to `@media (max-width: 768px)` section:**
```css
.cvc-header__menu-link {
    padding: 0.5rem 0.75rem;
    font-size: 0.95rem;
    min-height: 44px;
  }
```

**✅ Checkpoint:** Refresh and check header - should be more compact with smaller icons.

---

## Phase 2: Mobile Header Structure

**Time Estimate:** 45 minutes  
**Location:** Liquid markup section (around line 5-140)

### Step 2.1: Hide Desktop Navigation on Mobile

**Add to `@media (max-width: 768px)` section in CSS:**
```css
/* Hide desktop navigation on mobile */
  .cvc-header__nav--left {
    display: none;
  }
```

### Step 2.2: Adjust Mobile Layout Order

**Update in `@media (max-width: 768px)` section:**
```css
/* Mobile layout order: hamburger, logo, utilities */
  .cvc-header__hamburger {
    order: 1;
    justify-self: start;
  }

  .cvc-header__logo {
    order: 2;
    justify-self: center;
  }

  .cvc-header__utilities {
    order: 3;
    justify-self: end;
  }
```

### Step 2.3: Remove Old Mobile Overrides

**Find and REMOVE these lines from `@media (max-width: 768px)` if they exist:**
```css
.cvc-header__nav--left {
  justify-self: center;
  order: 2;
}

.cvc-header__logo {
  justify-self: center;
  order: 1;
}

.cvc-header__utilities {
  justify-self: center;
  order: 3;
}

.cvc-header__menu {
  flex-direction: column;
  width: 100%;
}
```

**✅ Checkpoint:** Desktop nav should be hidden on mobile, logo should be centered.

---

## Phase 3: Hamburger Button

**Time Estimate:** 30 minutes

### Step 3.1: Add Hamburger HTML

**Find the opening `<header class="cvc-header">` tag (around line 5) and ADD this right after `<div class="cvc-header__container">`:**

```liquid
{%- comment -%} Mobile Hamburger Menu {%- endcomment -%}
    <button class="cvc-header__hamburger" aria-label="Open menu" aria-expanded="false">
      <span class="hamburger-icon">
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </span>
    </button>
```

**The structure should look like:**
```liquid
<header class="cvc-header">
  <div class="cvc-header__container">
    {%- comment -%} Mobile Hamburger Menu {%- endcomment -%}
    <button class="cvc-header__hamburger" aria-label="Open menu" aria-expanded="false">
      <!-- hamburger icon -->
    </button>

    {%- comment -%} Left Navigation Menu {%- endcomment -%}
    <nav class="cvc-header__nav cvc-header__nav--left">
      <!-- existing desktop nav -->
    </nav>
```

### Step 3.2: Add Hamburger CSS

**Add BEFORE the `@media (max-width: 768px)` section (around line 550):**

```css
/* Hamburger Menu Button */
  .cvc-header__hamburger {
    display: none;
    width: 44px;
    height: 44px;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    position: relative;
    z-index: 10001;
  }

  .hamburger-icon {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 24px;
    height: 24px;
    margin: auto;
  }

  .hamburger-line {
    width: 24px;
    height: 2px;
    background-color: #333;
    display: block;
    margin: 3px 0;
    transition: all 0.3s ease;
  }

  /* Animated hamburger to X */
  .cvc-header__hamburger[aria-expanded="true"] .hamburger-line:nth-child(1) {
    transform: translateY(8px) rotate(45deg);
  }

  .cvc-header__hamburger[aria-expanded="true"] .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .cvc-header__hamburger[aria-expanded="true"] .hamburger-line:nth-child(3) {
    transform: translateY(-8px) rotate(-45deg);
  }
```

### Step 3.3: Show Hamburger on Mobile

**Add to `@media (max-width: 768px)` section:**
```css
.cvc-header__hamburger {
    display: flex;
    align-items: center;
    justify-content: center;
  }
```

**✅ Checkpoint:** You should see hamburger icon on mobile (left side), won't function yet.

---

## Phase 4: Mobile Drawer

**Time Estimate:** 1 hour

### Step 4.1: Add Drawer HTML

**Add this AFTER the closing `</header>` tag (around line 142):**

```liquid
{%- comment -%} Mobile Menu Drawer {%- endcomment -%}
<div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
  <div class="mobile-drawer__backdrop"></div>
  
  <div class="mobile-drawer__panel">
    <div class="mobile-drawer__header">
      <h2 class="mobile-drawer__title">Menu</h2>
      <button class="mobile-drawer__close" aria-label="Close menu">
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" fill="currentColor"/>
        </svg>
      </button>
    </div>

    <nav class="mobile-drawer__nav">
      <ul class="mobile-drawer__menu">
        {% for block in section.blocks %}
          {% case block.type %}
            {% when 'cvc_van_model_menu' %}
              <li class="mobile-drawer__menu-item">
                <button class="mobile-drawer__menu-link mobile-drawer__menu-link--parent" data-submenu="shop">
                  Shop
                  <span class="mobile-drawer__arrow">›</span>
                </button>
              </li>

            {% when 'cvc_conversion_guides' %}
              <li class="mobile-drawer__menu-item">
                <button class="mobile-drawer__menu-link mobile-drawer__menu-link--parent" data-submenu="conversion">
                  Conversion Guides
                  <span class="mobile-drawer__arrow">›</span>
                </button>
              </li>

            {% when 'cvc_start_build_menu' %}
              <li class="mobile-drawer__menu-item">
                <button class="mobile-drawer__menu-link mobile-drawer__menu-link--parent" data-submenu="build">
                  Start Your Build
                  <span class="mobile-drawer__arrow">›</span>
                </button>
              </li>
          {% endcase %}
        {% endfor %}
      </ul>
    </nav>
  </div>
</div>
```

### Step 4.2: Add Drawer Base CSS

**Add BEFORE `@media (max-width: 768px)` section:**

```css
/* Mobile Drawer - Base Styles */
  .mobile-drawer {
    display: none; /* Hidden by default, shown on mobile */
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 10000;
    pointer-events: none;
  }

  .mobile-drawer[aria-hidden="false"] {
    pointer-events: auto;
  }

  .mobile-drawer__backdrop {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .mobile-drawer[aria-hidden="false"] .mobile-drawer__backdrop {
    opacity: 1;
  }

  .mobile-drawer__panel {
    position: absolute;
    top: 0;
    left: 0;
    width: 85%;
    max-width: 320px;
    height: 100vh;
    background: white;
    box-shadow: 2px 0 10px rgba(0, 0, 0, 0.15);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .mobile-drawer[aria-hidden="false"] .mobile-drawer__panel {
    transform: translateX(0);
  }

  .mobile-drawer__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
  }

  .mobile-drawer__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin: 0;
  }

  .mobile-drawer__close {
    width: 40px;
    height: 40px;
    padding: 8px;
    border: none;
    background: none;
    cursor: pointer;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
  }

  .mobile-drawer__close:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  .mobile-drawer__nav {
    padding: 0;
  }

  .mobile-drawer__menu {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .mobile-drawer__menu-item {
    border-bottom: 1px solid #f0f0f0;
  }

  .mobile-drawer__menu-link {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    padding: 1rem 1.25rem;
    border: none;
    background: none;
    text-align: left;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s ease;
  }

  .mobile-drawer__menu-link:hover,
  .mobile-drawer__menu-link:active {
    background-color: rgba(0, 0, 0, 0.03);
  }

  .mobile-drawer__arrow {
    font-size: 1.5rem;
    color: #999;
  }
```

### Step 4.3: Show Drawer on Mobile Only

**Add to `@media (max-width: 768px)` section:**

```css
.mobile-drawer {
    display: block;
  }
```

**✅ Checkpoint:** Drawer structure in place but not yet functional. Hamburger button visible but doesn't open drawer.

---

## Phase 5: Shop Megamenu with Tabs

**Time Estimate:** 1.5 hours

### Step 5.1: Add Shop Submenu HTML

**Add this right AFTER the `</nav>` closing tag in the mobile drawer (after the main menu, around line 170 in your updated file):**

```liquid
    {%- comment -%} Shop Submenu {%- endcomment -%}
    <div class="mobile-drawer__submenu" id="submenu-shop" aria-hidden="true">
      <div class="mobile-drawer__submenu-header">
        <button class="mobile-drawer__back" data-back>
          <span class="mobile-drawer__back-arrow">‹</span>
          Back
        </button>
        <h3 class="mobile-drawer__submenu-title">Shop</h3>
      </div>

      <div class="mobile-drawer__submenu-content">
        {%- comment -%} Tabs {%- endcomment -%}
        <div class="mobile-drawer__tabs">
          <button class="mobile-drawer__tab" data-tab="categories">
            Categories
          </button>
          <button class="mobile-drawer__tab mobile-drawer__tab--active" data-tab="vans">
            Van Models
          </button>
        </div>

        {%- comment -%} Tab Content: Categories (Active by default) {%- endcomment -%}
        <div class="mobile-drawer__tab-panel mobile-drawer__tab-panel--active" id="tab-categories">
          <div class="mobile-drawer__links">
            {% for link in linklists.header-menu.links %}
              {% if link.title == 'Shop' %}
                {% if link.links.size > 0 %}
                  {% for child_link in link.links %}
                    <a href="{{ child_link.url }}" class="mobile-drawer__link">
                      {{ child_link.title }}
                    </a>
                  {% endfor %}
                {% endif %}
              {% endif %}
            {% endfor %}
          </div>
        </div>

        {%- comment -%} Tab Content: Van Models {%- endcomment -%}
        <div class="mobile-drawer__tab-panel" id="tab-vans">
          <div class="mobile-drawer__van-grid">
            {% for van_block in section.blocks %}
              {% if van_block.type == 'van_model' %}
                {% assign model_name = van_block.settings.van_name %}
                {% assign model_image = van_block.settings.van_image %}
                
                {% if model_name != blank %}
                  {% liquid
                    assign model_slug = model_name | handleize | prepend: 'model-'
                  %}
                  <a
                    href="#"
                    class="mobile-drawer__van-item"
                    data-model-id="{{ model_slug }}"
                    data-model-name="{{ model_name }}"
                  >
                    {% if model_image %}
                      <img
                        src="{{ model_image | image_url: width: 120 }}"
                        alt="{{ model_name }}"
                        loading="lazy"
                        width="120"
                        height="auto"
                        class="mobile-drawer__van-image"
                      >
                    {% else %}
                      <div class="mobile-drawer__van-placeholder">
                        <span>{{ model_name }}</span>
                      </div>
                    {% endif %}
                    <span class="mobile-drawer__van-label">{{ model_name }}</span>
                  </a>
                {% endif %}
              {% endif %}
            {% endfor %}
          </div>
        </div>
      </div>
    </div>
```

### Step 5.2: Add Shop Submenu CSS

**Add AFTER the mobile drawer base styles (before `@media` section):**

```css
/* Mobile Drawer Submenu */
  .mobile-drawer__submenu {
    position: absolute;
    top: 0;
    left: 100%;
    width: 100%;
    height: 100%;
    background: white;
    transition: left 0.3s ease;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .mobile-drawer__submenu[aria-hidden="false"] {
    left: 0;
  }

  .mobile-drawer__submenu-header {
    display: flex;
    align-items: center;
    padding: 1rem;
    border-bottom: 1px solid #e0e0e0;
    position: sticky;
    top: 0;
    background: white;
    z-index: 10;
    gap: 1rem;
  }

  .mobile-drawer__back {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    padding: 0.5rem;
    border: none;
    background: none;
    font-size: 1rem;
    font-weight: 500;
    color: #0066cc;
    cursor: pointer;
  }

  .mobile-drawer__back-arrow {
    font-size: 1.5rem;
    line-height: 1;
  }

  .mobile-drawer__submenu-title {
    font-size: 1.125rem;
    font-weight: 600;
    margin: 0;
    flex: 1;
  }

  .mobile-drawer__submenu-content {
    padding: 0;
  }

  /* Tabs */
  .mobile-drawer__tabs {
    display: flex;
    border-bottom: 2px solid #e0e0e0;
    position: sticky;
    top: 57px; /* Height of submenu header */
    background: white;
    z-index: 9;
  }

  .mobile-drawer__tab {
    flex: 1;
    padding: 0.875rem 1rem;
    border: none;
    background: transparent;
    font-size: 0.95rem;
    font-weight: 500;
    color: #666;
    cursor: pointer;
    border-bottom: 3px solid transparent;
    transition: all 0.2s ease;
  }

  .mobile-drawer__tab--active {
    color: #0066cc;
    border-bottom-color: #0066cc;
  }

  .mobile-drawer__tab-panel {
    display: none;
    padding: 1rem;
  }

  .mobile-drawer__tab-panel--active {
    display: block;
  }

  /* Categories Links */
  .mobile-drawer__links {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .mobile-drawer__link {
    padding: 0.875rem 0.5rem;
    border-bottom: 1px solid #f5f5f5;
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    transition: background-color 0.2s ease;
  }

  .mobile-drawer__link:hover,
  .mobile-drawer__link:active {
    background-color: rgba(0, 0, 0, 0.02);
  }

  /* Van Grid */
  .mobile-drawer__van-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  .mobile-drawer__van-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: #333;
    padding: 0.75rem;
    border: 1px solid #e0e0e0;
    border-radius: 8px;
    transition: all 0.2s ease;
  }

  .mobile-drawer__van-item:hover,
  .mobile-drawer__van-item:active {
    border-color: #0066cc;
    background-color: rgba(0, 102, 204, 0.02);
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  .mobile-drawer__van-image {
    width: 100%;
    height: auto;
    max-height: 80px;
    object-fit: contain;
    margin-bottom: 0.5rem;
  }

  .mobile-drawer__van-placeholder {
    width: 100%;
    height: 80px;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-bottom: 0.5rem;
  }

  .mobile-drawer__van-placeholder span {
    font-size: 0.75rem;
    color: #999;
    text-align: center;
    padding: 0.5rem;
  }

  .mobile-drawer__van-label {
    font-size: 0.875rem;
    font-weight: 500;
    text-align: center;
    line-height: 1.2;
  }
```

### Step 5.3: Adjust Tab Order (Categories First)

**In the HTML you just added, make sure the tabs are in this order and the Categories panel is active:**

```liquid
<div class="mobile-drawer__tabs">
  <button class="mobile-drawer__tab mobile-drawer__tab--active" data-tab="categories">
    Categories
  </button>
  <button class="mobile-drawer__tab" data-tab="vans">
    Van Models
  </button>
</div>

{%- comment -%} Tab Content: Categories (Active by default) {%- endcomment -%}
<div class="mobile-drawer__tab-panel mobile-drawer__tab-panel--active" id="tab-categories">
  <!-- Categories content -->
</div>

{%- comment -%} Tab Content: Van Models {%- endcomment -%}
<div class="mobile-drawer__tab-panel" id="tab-vans">
  <!-- Van models content -->
</div>
```

**✅ Checkpoint:** Shop submenu structure in place with tabs (Categories shown first).

---

## Phase 6: Conversion Guides Simplification

**Time Estimate:** 45 minutes

### Step 6.1: Add Conversion Guides Submenu HTML

**Add this AFTER the Shop submenu closing `</div>` tag:**

```liquid
    {%- comment -%} Conversion Guides Submenu {%- endcomment -%}
    <div class="mobile-drawer__submenu" id="submenu-conversion" aria-hidden="true">
      <div class="mobile-drawer__submenu-header">
        <button class="mobile-drawer__back" data-back>
          <span class="mobile-drawer__back-arrow">‹</span>
          Back
        </button>
        <h3 class="mobile-drawer__submenu-title">Conversion Guides</h3>
      </div>

      <div class="mobile-drawer__submenu-content">
        <div class="mobile-drawer__simple-list">
          {% for block in section.blocks %}
            {% if block.type == 'cvc_conversion_guides' %}
              {% for i in (1..10) %}
                {% assign phase_title_key = 'phase_' | append: i | append: '_title' %}
                {% assign phase_links_key = 'phase_' | append: i | append: '_links' %}
                {% assign phase_title = block.settings[phase_title_key] %}
                {% assign phase_links = block.settings[phase_links_key] %}
                
                {% if phase_title != blank %}
                  <div class="mobile-drawer__phase">
                    <h4 class="mobile-drawer__phase-title">{{ phase_title }}</h4>
                    <div class="mobile-drawer__phase-links">
                      {% assign links = phase_links | newline_to_br | split: '<br />' %}
                      {% for link in links %}
                        {% if link != blank %}
                          {% assign link_parts = link | split: '|' %}
                          {% if link_parts.size == 2 %}
                            <a href="{{ link_parts[1] | strip }}" class="mobile-drawer__link">
                              {{ link_parts[0] | strip }}
                            </a>
                          {% else %}
                            <a href="#" class="mobile-drawer__link">{{ link | strip }}</a>
                          {% endif %}
                        {% endif %}
                      {% endfor %}
                    </div>
                  </div>
                {% endif %}
              {% endfor %}
            {% endif %}
          {% endfor %}
        </div>
      </div>
    </div>
```

### Step 6.2: Add Conversion Guides CSS

**Add AFTER the Shop submenu CSS:**

```css
/* Conversion Guides Simple List */
  .mobile-drawer__simple-list {
    padding: 0.5rem 0;
  }

  .mobile-drawer__phase {
    padding: 0.75rem 1.25rem;
    border-bottom: 1px solid #e0e0e0;
  }

  .mobile-drawer__phase:last-child {
    border-bottom: none;
  }

  .mobile-drawer__phase-title {
    font-size: 0.95rem;
    font-weight: 600;
    color: #333;
    margin: 0 0 0.5rem 0;
    padding: 0;
  }

  .mobile-drawer__phase-links {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  .mobile-drawer__phase-links .mobile-drawer__link {
    padding: 0.5rem 0;
    border-bottom: none;
    font-size: 0.95rem;
    font-weight: 400;
    color: #555;
  }

  .mobile-drawer__phase-links .mobile-drawer__link:last-child {
    padding-bottom: 0;
  }
```

**✅ Checkpoint:** Conversion Guides submenu with simple horizontal-line-separated phases.

---

## Phase 7: Start Your Build Simplification

**Time Estimate:** 30 minutes

### Step 7.1: Add Start Your Build Submenu HTML

**Add this AFTER the Conversion Guides submenu closing `</div>` tag:**

```liquid
    {%- comment -%} Start Your Build Submenu {%- endcomment -%}
    <div class="mobile-drawer__submenu" id="submenu-build" aria-hidden="true">
      <div class="mobile-drawer__submenu-header">
        <button class="mobile-drawer__back" data-back>
          <span class="mobile-drawer__back-arrow">‹</span>
          Back
        </button>
        <h3 class="mobile-drawer__submenu-title">Start Your Build</h3>
      </div>

      <div class="mobile-drawer__submenu-content">
        {% for block in section.blocks %}
          {% if block.type == 'cvc_start_build_menu' %}
            <div class="mobile-drawer__build-content">
              {% if block.settings.content != blank %}
                <p class="mobile-drawer__build-text">{{ block.settings.content }}</p>
              {% endif %}

              {% if block.settings.show_cta and block.settings.cta_text != blank %}
                <a href="{{ block.settings.cta_url | default: '#' }}" class="mobile-drawer__build-cta">
                  {{ block.settings.cta_text }}
                </a>
              {% endif %}
            </div>
          {% endif %}
        {% endfor %}
      </div>
    </div>
```

### Step 7.2: Add Start Your Build CSS

**Add AFTER the Conversion Guides CSS:**

```css
/* Start Your Build Simple Content */
  .mobile-drawer__build-content {
    padding: 1.25rem;
  }

  .mobile-drawer__build-text {
    font-size: 0.95rem;
    line-height: 1.6;
    color: #555;
    margin: 0 0 1.5rem 0;
  }

  .mobile-drawer__build-cta {
    display: inline-block;
    padding: 0.875rem 1.5rem;
    background: #0066cc;
    color: white;
    text-decoration: none;
    border-radius: 6px;
    font-weight: 600;
    font-size: 1rem;
    text-align: center;
    transition: background-color 0.2s ease;
  }

  .mobile-drawer__build-cta:hover,
  .mobile-drawer__build-cta:active {
    background: #0052a3;
  }
```

**✅ Checkpoint:** All three submenus (Shop, Conversion Guides, Start Your Build) are now structured.

---

## Phase 8: JavaScript Implementation

**Time Estimate:** 1 hour

### Step 8.1: Add JavaScript Before Closing `</style>` Tag

**Find the existing `<script>` section (around line 650) and ADD this new script AFTER it (before `{% schema %}`):**

```liquid
<script>
  // Mobile Drawer Navigation
  (function() {
    const hamburger = document.querySelector('.cvc-header__hamburger');
    const drawer = document.querySelector('.mobile-drawer');
    const drawerBackdrop = document.querySelector('.mobile-drawer__backdrop');
    const closeBtn = document.querySelector('.mobile-drawer__close');
    const menuLinks = document.querySelectorAll('.mobile-drawer__menu-link--parent');
    const backButtons = document.querySelectorAll('.mobile-drawer__back');
    const body = document.body;

    if (!hamburger || !drawer) return;

    // Open drawer
    function openDrawer() {
      drawer.setAttribute('aria-hidden', 'false');
      hamburger.setAttribute('aria-expanded', 'true');
      body.style.overflow = 'hidden';
    }

    // Close drawer
    function closeDrawer() {
      drawer.setAttribute('aria-hidden', 'true');
      hamburger.setAttribute('aria-expanded', 'false');
      body.style.overflow = '';
      
      // Close all submenus when drawer closes
      setTimeout(() => {
        const allSubmenus = document.querySelectorAll('.mobile-drawer__submenu');
        allSubmenus.forEach(submenu => {
          submenu.setAttribute('aria-hidden', 'true');
        });
      }, 300);
    }

    // Open submenu
    function openSubmenu(submenuId) {
      const submenu = document.getElementById(submenuId);
      if (submenu) {
        submenu.setAttribute('aria-hidden', 'false');
      }
    }

    // Close submenu
    function closeSubmenu(submenu) {
      submenu.setAttribute('aria-hidden', 'true');
    }

    // Event listeners
    hamburger.addEventListener('click', openDrawer);
    closeBtn.addEventListener('click', closeDrawer);
    drawerBackdrop.addEventListener('click', closeDrawer);

    // Menu item clicks - open submenus
    menuLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const submenuId = 'submenu-' + link.dataset.submenu;
        openSubmenu(submenuId);
      });
    });

    // Back button clicks - close submenus
    backButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const submenu = btn.closest('.mobile-drawer__submenu');
        if (submenu) {
          closeSubmenu(submenu);
        }
      });
    });

    // Tab switching in Shop submenu
    const tabs = document.querySelectorAll('.mobile-drawer__tab');
    const tabPanels = document.querySelectorAll('.mobile-drawer__tab-panel');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const targetTab = tab.dataset.tab;
        
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('mobile-drawer__tab--active'));
        
        // Add active class to clicked tab
        tab.classList.add('mobile-drawer__tab--active');
        
        // Hide all panels
        tabPanels.forEach(panel => panel.classList.remove('mobile-drawer__tab-panel--active'));
        
        // Show target panel
        const targetPanel = document.getElementById('tab-' + targetTab);
        if (targetPanel) {
          targetPanel.classList.add('mobile-drawer__tab-panel--active');
        }
      });
    });

    // Van model selection (keep existing functionality)
    const vanModelLinks = document.querySelectorAll('.mobile-drawer__van-item');
    
    vanModelLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const modelId = this.getAttribute('data-model-id');
        const modelName = this.getAttribute('data-model-name');
        
        if (modelId) {
          // Store the selected van model
          sessionStorage.setItem('selectedVanModel', modelId);
          
          // Close drawer
          closeDrawer();
          
          // Apply filter to current page
          const url = new URL(window.location.href);
          const params = new URLSearchParams(url.search);
          
          // Remove any existing filter.p.tag parameters
          for (const key of Array.from(params.keys())) {
            if (key.startsWith('filter.p.tag')) {
              params.delete(key);
            }
          }
          
          // Add the new filter parameter
          params.set('filter.p.tag', modelId);
          url.search = params.toString();
          
          // Navigate if on collection/product page
          const pathname = window.location.pathname;
          if (pathname.includes('/collections/') || pathname.includes('/products/')) {
            window.location.href = url.toString();
          } else {
            // Show notification
            showNotification(`Van filter set to: ${modelName}`);
          }
        }
      });
    });

    // Notification helper
    function showNotification(message) {
      let notification = document.getElementById('van-selector-notification');
      
      if (!notification) {
        notification = document.createElement('div');
        notification.id = 'van-selector-notification';
        notification.style.cssText = `
          position: fixed;
          top: 70px;
          right: 20px;
          background: #0066cc;
          color: white;
          padding: 1rem 1.5rem;
          border-radius: 6px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
          z-index: 10000;
          opacity: 0;
          transition: opacity 0.3s ease;
        `;
        document.body.appendChild(notification);
      }

      notification.textContent = message;
      notification.style.opacity = '1';

      setTimeout(() => {
        notification.style.opacity = '0';
      }, 3000);
    }

    // ESC key to close drawer
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.getAttribute('aria-hidden') === 'false') {
        closeDrawer();
      }
    });
  })();
</script>
```

**✅ Checkpoint:** Full mobile drawer functionality should now work!

---

## Phase 9: Small Screen Optimization

**Time Estimate:** 15 minutes

### Step 9.1: Add Extra Small Phone Support

**Add this NEW media query AFTER the existing `@media (max-width: 768px)` section:**

```css
/* Extra small phones */
  @media (max-width: 390px) {
    .cvc-header__container {
      padding: 0.5rem;
      gap: 0.5rem;
    }

    .cvc-header__logo-image {
      max-width: 120px !important;
      max-height: 30px !important;
    }

    .cvc-header__utilities {
      gap: 0.25rem;
    }

    .cvc-header__search-toggle,
    .cvc-header__account-link,
    .cvc-header__cart-link {
      width: 36px;
      height: 36px;
    }

    .mobile-drawer__van-grid {
      grid-template-columns: repeat(2, 1fr);
      gap: 0.75rem;
    }

    .mobile-drawer__van-item {
      padding: 0.5rem;
    }
  }
```

**✅ Checkpoint:** Header optimized for very small screens.

---

## Phase 10: Desktop Megamenu Update

**Time Estimate:** 15 minutes

### Step 10.1: Ensure Desktop Megamenu Still Works

**Verify these styles are still present for desktop (they should be unchanged):**

```css
/* Keep menu open when hovering over button OR panel */
.cvc-header__menu-item.has-megamenu:hover .cvc-header__megamenu-panel,
.cvc-header__megamenu-panel:hover {
  display: block;
}
```

### Step 10.2: Hide Mobile Drawer on Desktop

**Add to the desktop styles (OUTSIDE and BEFORE the `@media (max-width: 768px)` section):**

```css
/* Hide mobile drawer on desktop */
  @media (min-width: 769px) {
    .mobile-drawer {
      display: none !important;
    }

    .cvc-header__hamburger {
      display: none !important;
    }
  }
```

**✅ Checkpoint:** Desktop navigation still works with hover megamenus, mobile drawer hidden on desktop.

---

## Testing Checklist

### Functional Testing

#### Mobile Devices (< 768px)
- [ ] Hamburger icon visible and positioned correctly (left side)
- [ ] Logo centered and sized appropriately
- [ ] Utility icons (Search, Account, Cart) visible and sized correctly (right side)
- [ ] Header height is ~56px
- [ ] Clicking hamburger opens drawer
- [ ] Drawer slides in from left smoothly
- [ ] Backdrop appears behind drawer
- [ ] Clicking backdrop closes drawer
- [ ] Clicking X button closes drawer
- [ ] ESC key closes drawer
- [ ] Body scroll locked when drawer open

#### Shop Submenu
- [ ] Clicking "Shop" opens submenu
- [ ] Submenu slides in from right
- [ ] Back button returns to main menu
- [ ] **Categories tab active by default** ✅
- [ ] Categories tab shows shop links correctly
- [ ] Clicking "Van Models" tab switches to van grid
- [ ] Van Models tab shows van images in 2-column grid
- [ ] Van items are tappable with visual feedback
- [ ] Clicking van closes drawer and applies filter (on collection pages)
- [ ] Clicking van shows notification (on non-collection pages)

#### Conversion Guides Submenu
- [ ] Clicking "Conversion Guides" opens submenu
- [ ] Back button returns to main menu
- [ ] All phases displayed as simple list
- [ ] Phase titles same size as links
- [ ] Horizontal lines separate phases
- [ ] Links are tappable
- [ ] Submenu scrollable if content is long

#### Start Your Build Submenu
- [ ] Clicking "Start Your Build" opens submenu
- [ ] Back button returns to main menu
- [ ] Content text displays correctly
- [ ] CTA button visible and styled
- [ ] CTA button is tappable

### Desktop Testing (> 768px)
- [ ] Hamburger menu NOT visible
- [ ] Mobile drawer NOT visible/accessible
- [ ] Desktop navigation visible (3 menu items)
- [ ] Hover over "Shop" shows desktop megamenu
- [ ] Hover over "Conversion Guides" shows desktop megamenu
- [ ] Hover over "Start Your Build" shows desktop megamenu
- [ ] Desktop megamenus display correctly (not affected by mobile changes)

### Cross-Browser Testing
- [ ] Safari iOS (iPhone)
- [ ] Chrome Android
- [ ] Safari macOS
- [ ] Chrome Desktop
- [ ] Firefox Desktop
- [ ] Edge Desktop

### Accessibility Testing
- [ ] Hamburger has proper aria-label
- [ ] Hamburger aria-expanded changes state
- [ ] Drawer has aria-hidden attribute
- [ ] Focus trapped in drawer when open
- [ ] Can navigate with keyboard (Tab key)
- [ ] Screen reader announces menu items
- [ ] Color contrast meets WCAG AA standards

### Performance Testing
- [ ] No layout shift on page load
- [ ] Animations are smooth (60fps)
- [ ] No console errors
- [ ] Images lazy load correctly
- [ ] Van model images don't block rendering

---

## Troubleshooting

### Issue: Drawer doesn't open
**Solution:** Check if JavaScript is loading. Look for console errors. Verify hamburger button has correct class `cvc-header__hamburger`.

### Issue: Drawer opens but doesn't close
**Solution:** Check if close button and backdrop have correct event listeners. Verify `aria-hidden` attribute is toggling.

### Issue: Submenus don't open
**Solution:** Check if menu links have `data-submenu` attribute. Verify submenu IDs match (`submenu-shop`, `submenu-conversion`, `submenu-build`).

### Issue: Tabs don't switch
**Solution:** Check if tabs have `data-tab` attribute. Verify tab panels have correct IDs (`tab-categories`, `tab-vans`).

### Issue: Van selection doesn't work
**Solution:** Check if van links have `data-model-id` and `data-model-name` attributes. Verify click event is attached.

### Issue: Hamburger shows on desktop
**Solution:** Verify media query `@media (min-width: 769px)` has `display: none !important` for `.cvc-header__hamburger`.

### Issue: Desktop megamenu broken
**Solution:** Make sure mobile styles are properly scoped to `@media (max-width: 768px)`. Desktop styles should not be affected.

### Issue: Logo too big/small
**Solution:** Adjust values in `.cvc-header__logo-image` within `@media (max-width: 768px)` section.

### Issue: Touch targets too small
**Solution:** Ensure all interactive elements have minimum `44px` height/width.

---

## File Structure Summary

After implementation, the file structure:

```
sections/cvc_header_example.liquid
├── Liquid Markup
│   ├── <header> Desktop structure
│   │   ├── Hamburger button (new)
│   │   ├── Desktop nav
│   │   ├── Logo
│   │   └── Utilities
│   └── Mobile Drawer (new)
│       ├── Main menu
│       ├── Shop submenu (with tabs)
│       ├── Conversion Guides submenu
│       └── Start Your Build submenu
├── <style>
│   ├── Base header styles
│   ├── Hamburger styles
│   ├── Mobile drawer base styles
│   ├── Submenu styles
│   ├── Shop tabs styles
│   ├── Conversion Guides styles
│   ├── Start Your Build styles
│   ├── @media (min-width: 769px) - Desktop overrides
│   ├── @media (max-width: 768px) - Mobile styles
│   └── @media (max-width: 390px) - Extra small phones
├── <script> Desktop header behavior (existing)
└── <script> Mobile drawer navigation (new)
```

---

## Code Review Checklist

Before considering complete:

- [ ] All HTML added in correct locations
- [ ] All CSS added in correct order
- [ ] JavaScript has no syntax errors
- [ ] Proper indentation maintained
- [ ] Liquid comments are clear
- [ ] No duplicate IDs
- [ ] All `aria-` attributes present
- [ ] All classes follow naming convention
- [ ] Media queries in correct order
- [ ] Desktop functionality preserved
- [ ] Mobile functionality complete

---

## Performance Optimization Tips

### Image Optimization
```liquid
{% if model_image %}
  <img
    src="{{ model_image | image_url: width: 120 }}"
    alt="{{ model_name }}"
    loading="lazy"
    width="120"
    height="auto"
  >
{% endif %}
```

### Reduce Repaints
```css
.mobile-drawer__panel {
  will-change: transform;
  transform: translateX(-100%);
}
```

### Use CSS Containment
```css
.mobile-drawer__submenu {
  contain: layout style paint;
}
```

---

## Future Enhancements (Post-Launch)

1. **Swipe Gestures**: Add touch swipe to close drawer
2. **Search in Drawer**: Add search functionality to mobile drawer
3. **Recent Vans**: Show recently selected vans at top of van grid
4. **Mega Menu Images**: Add category images to Shop categories tab
5. **Animations**: Add micro-interactions for better UX
6. **Persistent State**: Remember which tab was last active
7. **Van Favorites**: Allow users to favorite/pin van models

---

## Deployment Steps

1. **Backup Production Theme**
   ```
   Download current theme from Shopify admin
   ```

2. **Test in Development Theme**
   ```
   Apply all changes to dev theme first
   Test thoroughly on multiple devices
   ```

3. **QA Sign-Off**
   ```
   Get approval from stakeholders
   Document any issues found
   ```

4. **Deploy to Production**
   ```
   Copy changes to live theme
   Monitor for issues
   ```

5. **Post-Deploy Monitoring**
   ```
   Check analytics for mobile bounce rate
   Monitor mobile conversion rate
   Review any customer feedback
   ```

---

## Success Metrics

Track these metrics after deployment:

- **Mobile Header Height**: Reduced from 80px to 56px ✅
- **Mobile Bounce Rate**: Should decrease
- **Mobile Navigation Clicks**: Track drawer opens, submenu opens
- **Van Model Selection**: Track which vans are most selected
- **Page Load Time**: Should not increase significantly
- **Mobile Conversion Rate**: Monitor for improvements

---

## Resources

- **Shopify Liquid Docs**: https://shopify.dev/docs/themes/liquid
- **ARIA Best Practices**: https://www.w3.org/WAI/ARIA/apg/
- **Mobile Touch Guidelines**: https://developers.google.com/web/fundamentals/accessibility/accessible-styles
- **CSS Transitions**: https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Transitions

---

## Contact & Support

If you encounter issues during implementation:

1. Check the Troubleshooting section above
2. Review the Testing Checklist
3. Verify all code was copied correctly
4. Check browser console for JavaScript errors
5. Test on actual mobile device (not just DevTools)

---

## Completion Timeline

| Phase | Task | Time | Status |
|-------|------|------|--------|
| 1 | Space Reduction | 30 min | ⬜ |
| 2 | Mobile Header Structure | 45 min | ⬜ |
| 3 | Hamburger Button | 30 min | ⬜ |
| 4 | Mobile Drawer | 1 hour | ⬜ |
| 5 | Shop Megamenu with Tabs | 1.5 hours | ⬜ |
| 6 | Conversion Guides | 45 min | ⬜ |
| 7 | Start Your Build | 30 min | ⬜ |
| 8 | JavaScript | 1 hour | ⬜ |
| 9 | Small Screen Optimization | 15 min | ⬜ |
| 10 | Desktop Verification | 15 min | ⬜ |
| | **Testing** | 1 hour | ⬜ |
| | **Total Estimated Time** | **7.5 hours** | |

---

## Final Notes

- Work in phases - complete one phase fully before moving to next
- Test after each phase (use checkpoints)
- Keep backup of original file
- Take screenshots of working state at each checkpoint
- Don't skip the testing phase
- Mobile-first is key - desktop should remain unchanged

**Good luck with implementation!** 🚀

---

*Implementation Guide prepared for Combe Valley Campers mobile header optimization - October 23, 2025*
