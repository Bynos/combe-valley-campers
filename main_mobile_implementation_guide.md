# Main Content Mobile Implementation Guide

**Date:** 23 October 2025  
**Project:** Combe Valley Campers - Main Content Mobile Optimization  
**Target File:** `sections/main-page.liquid` and related block files

---

## Implementation Strategy

This guide implements mobile-first optimizations for all main content sections by:
- ✅ Creating universal CSS classes for common mobile patterns
- ✅ Optimizing each section type individually
- ✅ Using vertical stacking (no carousels)
- ✅ Testing after each phase
- ✅ Backing up files before changes

---

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Phase 1: Universal Mobile Optimizations](#phase-1-universal-mobile-optimizations)
3. [Phase 2: Hero Section](#phase-2-hero-section)
4. [Phase 3: Features Section](#phase-3-features-section)
5. [Phase 4: Products Section](#phase-4-products-section)
6. [Phase 5: Collection List Section](#phase-5-collection-list-section)
7. [Phase 6: Image With Text Section](#phase-6-image-with-text-section)
8. [Phase 7: Rich Text Section](#phase-7-rich-text-section)
9. [Phase 8: Video Section](#phase-8-video-section)
10. [Phase 9: FAQ Section](#phase-9-faq-section)
11. [Phase 10: Newsletter Section](#phase-10-newsletter-section)
12. [Phase 11: Testimonials Section](#phase-11-testimonials-section)
13. [Testing Checklist](#testing-checklist)

---

## Prerequisites

### Backup Strategy
Before starting any phase, create backups:
```bash
# We'll create backups for each file as we work on it
# Format: backup_[original-filename]
# These can be deleted once testing confirms everything works
```

### Test Environment
- Test on Shopify development theme first
- Have mobile device or Chrome DevTools ready (375px, 390px, 768px breakpoints)
- Clear browser cache between tests

### Files We'll Be Working With
Based on the sections, we'll likely edit:
- `assets/base.css` or `assets/global.css` (for universal styles)
- Individual block/section files as needed
- Test each change before moving to the next phase

---

## Phase 1: Universal Mobile Optimizations

**Time Estimate:** 45-60 minutes  
**Purpose:** Create reusable mobile CSS classes and global optimizations that all sections will benefit from

This phase establishes the foundation for all subsequent mobile improvements by:
1. Setting up responsive typography scale
2. Creating universal spacing utilities
3. Ensuring proper touch targets
4. Adding common mobile layout patterns

---

### Step 1.1: Identify the Global CSS File

**Find where global styles are defined:**

Look for one of these files:
- `assets/base.css`
- `assets/global.css`
- `assets/theme.css`
- Or check `layout/theme.liquid` to see which CSS file loads first

**Action:**
```bash
# List CSS files to identify the main global stylesheet
ls -la assets/*.css
```

**Once identified, note the filename:** _________________

---

### Step 1.2: Create Backup of Global CSS File

**Before making any changes:**

```bash
# Replace 'base.css' with your actual global CSS filename
cp assets/base.css assets/backup_base.css
```

**✅ Checkpoint:** Backup file created successfully

---

### Step 1.3: Add Universal Mobile Typography Scale

**Location:** Add to the END of your global CSS file (before any existing media queries if present)

**Purpose:** Consistent, readable typography across all mobile sections

**Add this code:**

```css
/* ============================================
   UNIVERSAL MOBILE OPTIMIZATIONS - Phase 1
   ============================================ */

/* Mobile Typography Scale */
@media (max-width: 768px) {
  /* Body text optimization */
  body {
    font-size: 1rem;
    line-height: 1.6;
  }

  /* Heading scale for standard mobile (390px - 768px) */
  h1, .h1 {
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  h2, .h2 {
    font-size: 1.75rem;
    line-height: 1.3;
    margin-bottom: 0.875rem;
  }

  h3, .h3 {
    font-size: 1.5rem;
    line-height: 1.4;
    margin-bottom: 0.75rem;
  }

  h4, .h4 {
    font-size: 1.25rem;
    line-height: 1.4;
  }

  h5, .h5 {
    font-size: 1.125rem;
    line-height: 1.4;
  }

  h6, .h6 {
    font-size: 1rem;
    line-height: 1.5;
  }

  /* Paragraph optimization */
  p {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  /* Better readability for long text */
  .rich-text p,
  .text-content p {
    line-height: 1.7;
    max-width: 100%;
  }
}

/* Extra small phones - more aggressive scaling */
@media (max-width: 390px) {
  body {
    font-size: 0.9375rem; /* 15px */
  }

  h1, .h1 {
    font-size: 1.75rem;
  }

  h2, .h2 {
    font-size: 1.5rem;
  }

  h3, .h3 {
    font-size: 1.25rem;
  }

  h4, .h4 {
    font-size: 1.125rem;
  }

  h5, .h5,
  h6, .h6 {
    font-size: 1rem;
  }
}
```

**✅ Checkpoint:** Typography scale added. Save the file.

---

### Step 1.4: Add Universal Mobile Spacing Classes

**Location:** Add immediately after the typography code you just added

**Purpose:** Consistent spacing that can be reused across all sections

**Add this code:**

```css
/* Universal Mobile Spacing */
@media (max-width: 768px) {
  /* Section spacing - applied to main containers */
  .mobile-section-padding {
    padding: 2.5rem 1.25rem;
  }

  .mobile-section-padding-top {
    padding-top: 2.5rem;
  }

  .mobile-section-padding-bottom {
    padding-bottom: 2.5rem;
  }

  .mobile-section-padding-horizontal {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  /* Compact spacing for tighter layouts */
  .mobile-compact-padding {
    padding: 1.5rem 1rem;
  }

  /* Item gaps - for flex/grid containers */
  .mobile-gap-standard {
    gap: 1rem;
  }

  .mobile-gap-comfortable {
    gap: 1.5rem;
  }

  .mobile-gap-compact {
    gap: 0.75rem;
  }

  /* Vertical stacking */
  .mobile-stack {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .mobile-stack-tight {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .mobile-stack-comfortable {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
}

/* Extra small phones - tighter spacing */
@media (max-width: 390px) {
  .mobile-section-padding {
    padding: 2rem 1rem;
  }

  .mobile-section-padding-horizontal {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .mobile-compact-padding {
    padding: 1.25rem 0.75rem;
  }

  .mobile-gap-standard {
    gap: 0.75rem;
  }

  .mobile-gap-comfortable {
    gap: 1rem;
  }

  .mobile-gap-compact {
    gap: 0.5rem;
  }

  .mobile-stack {
    gap: 0.75rem;
  }

  .mobile-stack-tight {
    gap: 0.5rem;
  }

  .mobile-stack-comfortable {
    gap: 1rem;
  }
}
```

**✅ Checkpoint:** Spacing classes added. Save the file.

---

### Step 1.5: Add Universal Touch Target Optimization

**Location:** Add immediately after the spacing code

**Purpose:** Ensure all interactive elements meet minimum touch target sizes (44px × 44px)

**Add this code:**

```css
/* Universal Touch Target Optimization */
@media (max-width: 768px) {
  /* Buttons - ensure adequate size */
  button,
  .button,
  .btn,
  [type="submit"],
  [type="button"],
  input[type="submit"],
  input[type="button"] {
    min-height: 48px;
    padding: 0.875rem 1.5rem;
    font-size: 1rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  /* Full-width buttons on mobile */
  .mobile-button-full {
    width: 100%;
    display: block;
  }

  /* Links - ensure they're easy to tap */
  a {
    min-height: 44px;
    display: inline-flex;
    align-items: center;
  }

  /* Inline links in paragraphs */
  p a,
  .text-content a,
  .rich-text a {
    display: inline;
    min-height: auto;
    text-decoration: underline;
    padding: 0.25rem 0;
  }

  /* Form inputs */
  input[type="text"],
  input[type="email"],
  input[type="tel"],
  input[type="search"],
  input[type="password"],
  input[type="number"],
  textarea,
  select {
    min-height: 48px;
    font-size: 16px; /* Prevents iOS zoom on focus */
    padding: 0.75rem 1rem;
    border-radius: 6px;
    width: 100%;
    box-sizing: border-box;
  }

  textarea {
    min-height: 120px;
  }

  /* Select dropdowns */
  select {
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23333' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 1rem center;
    padding-right: 2.5rem;
  }

  /* Checkbox and radio - larger touch targets */
  input[type="checkbox"],
  input[type="radio"] {
    min-width: 24px;
    min-height: 24px;
    margin-right: 0.5rem;
  }
}
```

**✅ Checkpoint:** Touch targets optimized. Save the file.

---

### Step 1.6: Add Universal Mobile Layout Utilities

**Location:** Add immediately after the touch target code

**Purpose:** Common layout patterns used across multiple sections

**Add this code:**

```css
/* Universal Mobile Layout Utilities */
@media (max-width: 768px) {
  /* Full-width containers */
  .mobile-full-width {
    width: 100%;
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    padding-right: 0;
  }

  /* Centered content with max-width */
  .mobile-centered-content {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  /* Hide on mobile */
  .mobile-hide {
    display: none !important;
  }

  /* Show only on mobile */
  .mobile-only {
    display: block;
  }

  /* Text alignment */
  .mobile-text-center {
    text-align: center;
  }

  .mobile-text-left {
    text-align: left;
  }

  /* Grid to single column */
  .mobile-single-column {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  /* Grid to two columns */
  .mobile-two-columns {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  /* Image optimization */
  .mobile-image-full {
    width: 100%;
    height: auto;
    display: block;
  }

  .mobile-image-contained {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Aspect ratio containers */
  .mobile-aspect-16-9 {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 */
    overflow: hidden;
  }

  .mobile-aspect-16-9 > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .mobile-aspect-1-1 {
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* 1:1 square */
    overflow: hidden;
  }

  .mobile-aspect-1-1 > * {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

/* Extra small phones adjustments */
@media (max-width: 390px) {
  .mobile-centered-content {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  /* Force single column on very small screens */
  .mobile-two-columns {
    grid-template-columns: 1fr;
  }
}

/* Desktop - hide mobile-only elements */
@media (min-width: 769px) {
  .mobile-only {
    display: none !important;
  }
}
```

**✅ Checkpoint:** Layout utilities added. Save the file.

---

### Step 1.7: Add Universal Card and Container Styles

**Location:** Add immediately after the layout utilities

**Purpose:** Consistent card/container styling for sections that use them

**Add this code:**

```css
/* Universal Card & Container Styles */
@media (max-width: 768px) {
  /* Mobile card pattern */
  .mobile-card {
    background: var(--color-background, #fff);
    border: 1px solid var(--color-border, #e0e0e0);
    border-radius: 8px;
    padding: 1rem;
    transition: all 0.2s ease;
  }

  .mobile-card:hover,
  .mobile-card:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Compact card */
  .mobile-card-compact {
    padding: 0.75rem;
    border-radius: 6px;
  }

  /* Comfortable card */
  .mobile-card-comfortable {
    padding: 1.5rem;
  }

  /* Card with image on top */
  .mobile-card-image-top {
    overflow: hidden;
  }

  .mobile-card-image-top img {
    width: 100%;
    height: auto;
    border-radius: 8px 8px 0 0;
    margin-bottom: 1rem;
  }

  /* Content sections */
  .mobile-section {
    padding: 2.5rem 1.25rem;
    width: 100%;
  }

  .mobile-section-compact {
    padding: 1.5rem 1rem;
  }

  /* Dividers */
  .mobile-divider {
    width: 100%;
    height: 1px;
    background: var(--color-border, #e0e0e0);
    margin: 1.5rem 0;
    border: none;
  }
}

/* Extra small phones */
@media (max-width: 390px) {
  .mobile-card {
    padding: 0.75rem;
    border-radius: 6px;
  }

  .mobile-card-compact {
    padding: 0.5rem;
  }

  .mobile-card-comfortable {
    padding: 1rem;
  }

  .mobile-section {
    padding: 2rem 1rem;
  }

  .mobile-section-compact {
    padding: 1.25rem 0.75rem;
  }
}
```

**✅ Checkpoint:** Card and container styles added. Save the file.

---

### Step 1.8: Test Phase 1 Changes

**Before moving to Phase 2, let's test the global optimizations:**

#### Testing Steps:

1. **Push changes to development theme:**
   ```bash
   shopify theme push
   ```

2. **Open your site on mobile device or Chrome DevTools (375px, 390px, 768px)**

3. **Check the following:**
   - [ ] Text is readable and sized appropriately
   - [ ] Headings scale down on smaller screens
   - [ ] Buttons are at least 48px tall
   - [ ] Form inputs don't cause zoom on iOS (16px font size)
   - [ ] No horizontal scrolling
   - [ ] Spacing looks consistent

4. **Test touch targets:**
   - [ ] Buttons are easy to tap
   - [ ] Links are easy to tap
   - [ ] Form inputs are easy to interact with

5. **Test on actual pages:**
   - Visit a few pages that use main-page.liquid
   - Check if any layouts broke
   - Verify text is still readable

#### If Issues Found:
- Check browser console for CSS errors
- Verify the media query syntax is correct
- Ensure no conflicts with existing mobile styles
- Adjust values if needed

#### If Everything Works:
✅ **Phase 1 Complete!** 

The universal mobile foundation is now in place. These classes and optimizations will be used throughout Phases 2-11.

---

### Step 1.9: Document What We Created

**Universal Classes Now Available:**

**Typography:**
- Automatic heading scale (h1-h6)
- Responsive body text
- Better line heights

**Spacing:**
- `.mobile-section-padding` - Standard section spacing
- `.mobile-stack` / `.mobile-stack-tight` / `.mobile-stack-comfortable` - Vertical layouts
- `.mobile-gap-standard` / `.mobile-gap-compact` / `.mobile-gap-comfortable` - Flex/grid gaps

**Layout:**
- `.mobile-single-column` - Grid to single column
- `.mobile-two-columns` - Grid to two columns
- `.mobile-full-width` - Full width container
- `.mobile-centered-content` - Centered with max-width
- `.mobile-hide` / `.mobile-only` - Show/hide on mobile

**Components:**
- `.mobile-card` / `.mobile-card-compact` / `.mobile-card-comfortable` - Card patterns
- `.mobile-button-full` - Full width buttons
- `.mobile-aspect-16-9` / `.mobile-aspect-1-1` - Aspect ratio containers

**Touch Targets:**
- All buttons minimum 48px height
- All inputs minimum 48px height
- Links have adequate tap area

---

## Next Steps

Once Phase 1 testing is complete and successful:
- ✅ Proceed to **Phase 2: Hero Section Optimization**
- We'll use the universal classes created here
- Each section will build on this foundation

---

**End of Phase 1**

*Ready to proceed to Phase 2? Make sure all Phase 1 tests pass before continuing.*

---

## Phase 2: Hero Section Optimization

**Time Estimate:** 30-45 minutes  
**Purpose:** Optimize hero sections for mobile with compact padding, responsive images, and better touch targets

**Implementation:** Compact Mobile Hero (Option A)
- Reduce vertical padding for mobile
- Optimize heading sizes
- Ensure background images are mobile-friendly
- Stack elements vertically with tighter spacing
- Adjust button sizes for better touch targets

---

### Step 2.1: Locate Hero Section Files

**Find hero section files in your theme:**

Hero sections might be in:
- `sections/hero.liquid`
- `blocks/hero.liquid`
- `sections/image-banner.liquid`
- Or search for files containing "hero" or "banner"

**Action:**
```bash
# Search for hero-related files
find . -name "*hero*.liquid" -o -name "*banner*.liquid"
```

**Note the files found:** _________________

For this guide, we'll use generic class names that should work with most hero implementations.

---

### Step 2.2: Create Backup of Hero Section File

**Before making any changes:**

```bash
# Replace 'hero.liquid' with your actual hero filename
cp sections/hero.liquid sections/backup_hero.liquid
```

**✅ Checkpoint:** Backup created

---

### Step 2.3: Add Hero Mobile CSS

**Location:** Add to your global CSS file (after Phase 1 code)

**Purpose:** Mobile-optimized hero section styling

**Add this code:**

```css
/* ============================================
   HERO SECTION MOBILE OPTIMIZATION - Phase 2
   ============================================ */

@media (max-width: 768px) {
  /* Hero container */
  .hero,
  .hero-section,
  .image-banner,
  [class*="hero"] {
    min-height: 400px;
    padding: 2rem 1.25rem;
  }

  /* Hero content wrapper */
  .hero__content,
  .hero-content,
  .banner__content,
  .image-banner__content {
    max-width: 100%;
    text-align: center;
    padding: 1.5rem 1rem;
    gap: 1rem;
  }

  /* Hero headings */
  .hero h1,
  .hero__heading,
  .hero-heading,
  .banner__heading,
  .image-banner__heading {
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1rem;
  }

  /* Hero subheading/description */
  .hero__subheading,
  .hero-subheading,
  .hero__text,
  .hero-text,
  .banner__text {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    max-width: 100%;
  }

  /* Hero buttons */
  .hero__button,
  .hero-button,
  .banner__button,
  .hero .button,
  .hero .btn {
    min-height: 48px;
    padding: 0.875rem 2rem;
    font-size: 1rem;
    width: 100%;
    max-width: 300px;
    margin: 0 auto;
  }

  /* Multiple buttons - stack them */
  .hero__buttons,
  .hero-buttons,
  .banner__buttons {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    align-items: center;
    width: 100%;
  }

  /* Hero background image optimization */
  .hero__image,
  .hero-image,
  .banner__media,
  .image-banner__media {
    min-height: 400px;
    object-fit: cover;
    object-position: center;
  }

  /* If hero uses background-image */
  .hero[style*="background-image"],
  .image-banner[style*="background-image"] {
    background-size: cover;
    background-position: center;
    background-attachment: scroll; /* Better performance on mobile */
  }

  /* Overlay for better text readability */
  .hero__overlay,
  .hero-overlay,
  .banner__overlay {
    background: rgba(0, 0, 0, 0.3);
    padding: 2rem 1.25rem;
  }

  /* Text color for better contrast */
  .hero--dark-text h1,
  .hero--dark-text p,
  .hero--dark-text .hero__heading,
  .hero--dark-text .hero__text {
    color: #ffffff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  }
}

/* Extra small phones - more compact */
@media (max-width: 390px) {
  .hero,
  .hero-section,
  .image-banner,
  [class*="hero"] {
    min-height: 350px;
    padding: 1.5rem 1rem;
  }

  .hero__content,
  .hero-content,
  .banner__content,
  .image-banner__content {
    padding: 1rem 0.75rem;
  }

  .hero h1,
  .hero__heading,
  .hero-heading,
  .banner__heading,
  .image-banner__heading {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }

  .hero__subheading,
  .hero-subheading,
  .hero__text,
  .hero-text,
  .banner__text {
    font-size: 0.9375rem;
    margin-bottom: 1rem;
  }

  .hero__button,
  .hero-button,
  .banner__button,
  .hero .button,
  .hero .btn {
    padding: 0.75rem 1.5rem;
    font-size: 0.9375rem;
  }

  .hero__image,
  .hero-image,
  .banner__media,
  .image-banner__media {
    min-height: 350px;
  }
}
```

**✅ Checkpoint:** Hero mobile CSS added. Save the file.

---

### Step 2.4: Update Hero Section Markup (If Needed)

**This step is OPTIONAL** - Only do this if your hero section doesn't automatically stack on mobile.

**Location:** In your hero section file (e.g., `sections/hero.liquid`)

**Look for the hero content container** and add mobile utility classes:

**Before:**
```liquid
<div class="hero__content">
  <h1 class="hero__heading">{{ section.settings.heading }}</h1>
  <p class="hero__text">{{ section.settings.text }}</p>
  <div class="hero__buttons">
    <a href="{{ section.settings.button_link }}" class="button">
      {{ section.settings.button_text }}
    </a>
  </div>
</div>
```

**After (add mobile utility classes):**
```liquid
<div class="hero__content mobile-stack-comfortable mobile-text-center">
  <h1 class="hero__heading">{{ section.settings.heading }}</h1>
  <p class="hero__text">{{ section.settings.text }}</p>
  <div class="hero__buttons mobile-stack">
    <a href="{{ section.settings.button_link }}" class="button mobile-button-full">
      {{ section.settings.button_text }}
    </a>
  </div>
</div>
```

**Classes added:**
- `mobile-stack-comfortable` - Stacks content vertically on mobile
- `mobile-text-center` - Centers text on mobile
- `mobile-stack` - Stacks buttons vertically
- `mobile-button-full` - Makes buttons full width (up to max-width)

**✅ Checkpoint:** Markup updated (if needed). Save the file.

---

### Step 2.5: Optimize Hero Background Images for Mobile

**Purpose:** Ensure hero background images load quickly and look good on mobile

**Option A: Use Shopify's Image Filters (Recommended)**

If your hero uses Liquid image tags, optimize them:

**Before:**
```liquid
<img src="{{ section.settings.image | image_url }}" alt="{{ section.settings.image.alt }}">
```

**After:**
```liquid
<img 
  src="{{ section.settings.image | image_url: width: 800 }}" 
  srcset="{{ section.settings.image | image_url: width: 400 }} 400w,
          {{ section.settings.image | image_url: width: 800 }} 800w,
          {{ section.settings.image | image_url: width: 1200 }} 1200w"
  sizes="(max-width: 768px) 100vw, 1200px"
  alt="{{ section.settings.image.alt | escape }}"
  loading="lazy"
  class="hero__image mobile-image-full"
>
```

**Benefits:**
- Loads smaller images on mobile
- Faster page load
- Better performance

**Option B: CSS Background Image with Media Query**

If using CSS background images, add mobile-specific version:

```css
@media (max-width: 768px) {
  .hero[style*="background-image"] {
    background-image: url('mobile-optimized-hero.jpg') !important;
    background-size: cover;
    background-position: center;
  }
}
```

**✅ Checkpoint:** Images optimized for mobile performance.

---

### Step 2.6: Add Hero-Specific Mobile Utilities

**Location:** Add to global CSS file (after hero mobile CSS)

**Purpose:** Additional helper classes for hero variations

**Add this code:**

```css
/* Hero Mobile Utilities */
@media (max-width: 768px) {
  /* Compact hero for less important pages */
  .hero--compact {
    min-height: 250px !important;
    padding: 1.5rem 1rem !important;
  }

  .hero--compact h1,
  .hero--compact .hero__heading {
    font-size: 1.5rem !important;
  }

  /* Full-height hero */
  .hero--full-height {
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Hero with gradient overlay */
  .hero--gradient-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(180deg, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.6) 100%);
    z-index: 1;
  }

  .hero--gradient-overlay .hero__content {
    position: relative;
    z-index: 2;
  }

  /* Hero with solid overlay for better contrast */
  .hero--dark-overlay::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }

  .hero--dark-overlay .hero__content {
    position: relative;
    z-index: 2;
    color: #ffffff;
  }

  /* Center-aligned hero content */
  .hero--center {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .hero--center .hero__content {
    width: 100%;
    max-width: 600px;
  }
}
```

**✅ Checkpoint:** Hero utilities added. Save the file.

---

### Step 2.7: Test Hero Section on Mobile

**Testing Steps:**

1. **Push changes to development theme:**
   ```bash
   shopify theme push
   ```

2. **Test on multiple screen sizes:**
   - iPhone SE (375px)
   - Standard mobile (390px)
   - Small tablet (768px)

3. **Check hero section specifically:**

   **Visual Tests:**
   - [ ] Hero height is appropriate (not too tall, not too short)
   - [ ] Heading text is readable (not too big, not too small)
   - [ ] Subheading/description text is readable
   - [ ] Background image loads and looks good
   - [ ] Text has good contrast with background
   - [ ] No text cutoff or overflow

   **Layout Tests:**
   - [ ] Content is centered on mobile
   - [ ] Elements stack vertically (heading, text, button)
   - [ ] Spacing between elements is comfortable
   - [ ] No horizontal scrolling
   - [ ] Padding around content feels right

   **Interactive Tests:**
   - [ ] Buttons are easy to tap (min 48px height)
   - [ ] Button text is clear and readable
   - [ ] Links work correctly
   - [ ] No elements overlapping

   **Performance Tests:**
   - [ ] Hero loads quickly
   - [ ] Images are optimized (check Network tab in DevTools)
   - [ ] No layout shift on load
   - [ ] Smooth scrolling

4. **Test different hero variations (if applicable):**
   - Hero with image background
   - Hero with solid color background
   - Hero with video background (if used)
   - Hero with overlay
   - Compact hero vs full-height hero

5. **Test on actual device:**
   - Test on real iPhone or Android phone
   - Check in portrait and landscape
   - Verify touch targets work well

---

### Step 2.8: Common Hero Issues & Fixes

**Issue 1: Text not readable on background image**
```css
/* Add to hero section */
.hero::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.hero__content {
  position: relative;
  z-index: 2;
  color: white;
}
```

**Issue 2: Hero too tall on mobile**
```css
@media (max-width: 768px) {
  .hero {
    min-height: 300px !important;
    max-height: 60vh !important;
  }
}
```

**Issue 3: Background image not covering properly**
```css
@media (max-width: 768px) {
  .hero__image,
  .hero {
    background-size: cover !important;
    background-position: center !important;
  }
}
```

**Issue 4: Buttons too wide**
```css
@media (max-width: 768px) {
  .hero__button {
    max-width: 280px;
    margin: 0 auto;
  }
}
```

**Issue 5: Heading too large**
```css
@media (max-width: 390px) {
  .hero h1 {
    font-size: 1.5rem !important;
    line-height: 1.3 !important;
  }
}
```

---

### Step 2.9: Verify Hero Accessibility on Mobile

**Accessibility Checklist:**

- [ ] **Color Contrast:** Text has sufficient contrast with background (4.5:1 minimum)
- [ ] **Touch Targets:** All interactive elements are min 48px × 48px
- [ ] **Text Size:** Minimum 16px for body text (prevents iOS zoom)
- [ ] **Alt Text:** Images have descriptive alt text
- [ ] **Keyboard Navigation:** Can tab through hero elements (test on desktop)
- [ ] **Screen Reader:** Text is in logical order (heading → text → button)
- [ ] **Motion:** No auto-playing animations (can cause motion sickness)

**Tools to test:**
- Chrome DevTools Lighthouse (Accessibility score)
- WebAIM Contrast Checker
- Mobile device screen reader (VoiceOver on iOS, TalkBack on Android)

---

### Step 2.10: Document Hero Implementation

**What We Optimized:**

✅ **Reduced padding** from desktop values to mobile-appropriate spacing  
✅ **Scaled headings** from 2rem to 1.75rem on extra small screens  
✅ **Stacked elements** vertically for better mobile flow  
✅ **Full-width buttons** with comfortable max-width (300px)  
✅ **Optimized images** with srcset and appropriate sizes  
✅ **Added overlays** for better text readability  
✅ **Centered content** for better mobile UX  
✅ **Touch targets** minimum 48px height  

**Classes Available:**
- `.hero--compact` - Smaller hero for secondary pages
- `.hero--full-height` - Full viewport height hero
- `.hero--gradient-overlay` - Gradient overlay for contrast
- `.hero--dark-overlay` - Solid overlay for contrast
- `.hero--center` - Centered content

**Mobile Breakpoints:**
- `768px` - Standard mobile optimization
- `390px` - Extra small phones (more aggressive scaling)

---

### Step 2.11: Optional Enhancements

**Enhancement 1: Add subtle animation on load**
```css
@media (max-width: 768px) {
  .hero__content {
    animation: fadeInUp 0.6s ease-out;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
}
```

**Enhancement 2: Lazy load background images**
```html
<div class="hero" data-bg-image="{{ section.settings.image | image_url: width: 800 }}">
  <!-- Content -->
</div>

<script>
  // Load background images on scroll
  document.addEventListener('DOMContentLoaded', function() {
    const heroes = document.querySelectorAll('[data-bg-image]');
    heroes.forEach(hero => {
      const bgImage = hero.dataset.bgImage;
      hero.style.backgroundImage = `url(${bgImage})`;
    });
  });
</script>
```

**Enhancement 3: Add safe area for notched phones**
```css
@media (max-width: 768px) {
  .hero {
    padding-top: max(2rem, env(safe-area-inset-top));
    padding-bottom: max(2rem, env(safe-area-inset-bottom));
  }
}
```

---

## ✅ Phase 2 Complete - Hero Section Optimized!

**Results:**
- Hero sections now responsive and mobile-friendly
- Compact padding saves vertical space
- Text is readable on all devices
- Buttons are touch-friendly
- Images are optimized for performance

**Before moving to Phase 3:**
1. Test hero on multiple pages
2. Verify all variations work correctly
3. Confirm no regressions on desktop
4. Get stakeholder approval if needed

---

**Next:** Phase 3 - Features Section Optimization

*Once Phase 2 testing is complete, proceed to Phase 3.*

---

## Phase 3: Features Section Optimization

**Time Estimate:** 30-45 minutes  
**Purpose:** Optimize features/benefits sections for mobile with single-column layout, appropriate icon sizes, and comfortable spacing

**Implementation:** Single Column Stack (Option A)
- Convert 3-column grid to single column on mobile
- Full-width feature cards with comfortable padding
- Icon size: 48px (reduced from desktop 64px)
- Centered layout for better readability
- Reduced gap between items (1.5rem)

---

### Step 3.1: Locate Features Section Files

**Find features section files in your theme:**

Features sections might be in:
- `sections/features.liquid`
- `blocks/features.liquid`
- `sections/multicolumn.liquid`
- `sections/icon-with-text.liquid`
- Or search for files with "feature" or "benefit" in the name

**Action:**
```bash
# Search for feature-related files
find . -name "*feature*.liquid" -o -name "*multicolumn*.liquid" -o -name "*icon*.liquid"
```

**Note the files found:** _________________

---

### Step 3.2: Create Backup of Features Section File

**Before making any changes:**

```bash
# Replace 'features.liquid' with your actual features filename
cp sections/features.liquid sections/backup_features.liquid
```

**✅ Checkpoint:** Backup created

---

### Step 3.3: Add Features Mobile CSS

**Location:** Add to your global CSS file (after Phase 2 code)

**Purpose:** Mobile-optimized features section styling

**Add this code:**

```css
/* ============================================
   FEATURES SECTION MOBILE OPTIMIZATION - Phase 3
   ============================================ */

@media (max-width: 768px) {
  /* Features container */
  .features,
  .features-section,
  .multicolumn,
  .icon-with-text,
  [class*="features"] {
    padding: 2.5rem 1.25rem;
  }

  /* Features grid - force single column */
  .features__grid,
  .features-grid,
  .multicolumn__list,
  .icon-with-text__list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    width: 100%;
  }

  /* Individual feature item */
  .feature,
  .feature-item,
  .multicolumn__item,
  .icon-with-text__item {
    text-align: center;
    padding: 1.5rem 1rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }

  /* Feature icon container */
  .feature__icon,
  .feature-icon,
  .multicolumn__icon,
  .icon-with-text__icon {
    width: 48px;
    height: 48px;
    margin: 0 auto 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .feature__icon img,
  .feature-icon img,
  .multicolumn__icon img,
  .icon-with-text__icon img {
    width: 48px;
    height: 48px;
    object-fit: contain;
  }

  .feature__icon svg,
  .feature-icon svg,
  .multicolumn__icon svg,
  .icon-with-text__icon svg {
    width: 48px;
    height: 48px;
  }

  /* Feature heading */
  .feature__heading,
  .feature-heading,
  .multicolumn__heading,
  .icon-with-text__heading,
  .feature h3,
  .feature h4 {
    font-size: 1.25rem;
    line-height: 1.4;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  /* Feature description */
  .feature__text,
  .feature-text,
  .multicolumn__text,
  .icon-with-text__text,
  .feature p {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin-bottom: 0;
    max-width: 100%;
  }

  /* Feature link/button */
  .feature__link,
  .feature-link,
  .multicolumn__link,
  .icon-with-text__link {
    margin-top: 1rem;
    font-size: 0.9375rem;
    text-decoration: underline;
    color: var(--color-link, #0066cc);
  }

  .feature__button,
  .feature-button,
  .multicolumn__button {
    margin-top: 1rem;
    min-height: 44px;
    padding: 0.75rem 1.5rem;
    width: auto;
    max-width: 240px;
  }

  /* Section heading above features */
  .features__heading,
  .features-heading,
  .multicolumn__heading-wrapper h2 {
    font-size: 1.75rem;
    text-align: center;
    margin-bottom: 2rem;
  }

  /* Section description above features */
  .features__description,
  .features-description,
  .multicolumn__description {
    font-size: 1rem;
    text-align: center;
    margin-bottom: 2rem;
    max-width: 100%;
  }
}

/* Extra small phones - more compact */
@media (max-width: 390px) {
  .features,
  .features-section,
  .multicolumn,
  .icon-with-text,
  [class*="features"] {
    padding: 2rem 1rem;
  }

  .features__grid,
  .features-grid,
  .multicolumn__list,
  .icon-with-text__list {
    gap: 1rem;
  }

  .feature,
  .feature-item,
  .multicolumn__item,
  .icon-with-text__item {
    padding: 1rem 0.75rem;
  }

  .feature__icon,
  .feature-icon,
  .multicolumn__icon,
  .icon-with-text__icon {
    width: 40px;
    height: 40px;
  }

  .feature__icon img,
  .feature-icon img,
  .multicolumn__icon img,
  .icon-with-text__icon img,
  .feature__icon svg,
  .feature-icon svg,
  .multicolumn__icon svg,
  .icon-with-text__icon svg {
    width: 40px;
    height: 40px;
  }

  .feature__heading,
  .feature-heading,
  .multicolumn__heading,
  .icon-with-text__heading,
  .feature h3,
  .feature h4 {
    font-size: 1.125rem;
  }

  .feature__text,
  .feature-text,
  .multicolumn__text,
  .icon-with-text__text,
  .feature p {
    font-size: 0.875rem;
  }

  .features__heading,
  .features-heading,
  .multicolumn__heading-wrapper h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}
```

**✅ Checkpoint:** Features mobile CSS added. Save the file.

---

### Step 3.4: Update Features Section Markup (If Needed)

**This step is OPTIONAL** - Only do this if features don't automatically stack on mobile.

**Location:** In your features section file (e.g., `sections/features.liquid`)

**Before:**
```liquid
<div class="features">
  <h2>{{ section.settings.heading }}</h2>
  <div class="features__grid">
    {% for block in section.blocks %}
      <div class="feature">
        <div class="feature__icon">
          {{ block.settings.icon }}
        </div>
        <h3>{{ block.settings.heading }}</h3>
        <p>{{ block.settings.text }}</p>
      </div>
    {% endfor %}
  </div>
</div>
```

**After (add mobile utility classes):**
```liquid
<div class="features mobile-section-padding">
  <h2 class="features__heading mobile-text-center">{{ section.settings.heading }}</h2>
  <div class="features__grid mobile-single-column mobile-gap-comfortable">
    {% for block in section.blocks %}
      <div class="feature mobile-card mobile-text-center">
        <div class="feature__icon">
          {{ block.settings.icon }}
        </div>
        <h3 class="feature__heading">{{ block.settings.heading }}</h3>
        <p class="feature__text">{{ block.settings.text }}</p>
      </div>
    {% endfor %}
  </div>
</div>
```

**Classes added:**
- `mobile-section-padding` - Standard mobile section spacing
- `mobile-text-center` - Centers text on mobile
- `mobile-single-column` - Forces single column layout
- `mobile-gap-comfortable` - Comfortable gap between items
- `mobile-card` - Card styling for each feature

**✅ Checkpoint:** Markup updated (if needed). Save the file.

---

### Step 3.5: Add Features Variation Styles

**Location:** Add to global CSS file (after features mobile CSS)

**Purpose:** Different feature layout variations for flexibility

**Add this code:**

```css
/* Features Mobile Variations */
@media (max-width: 768px) {
  /* Compact features - less padding, smaller gaps */
  .features--compact .feature,
  .features--compact .feature-item {
    padding: 1rem 0.75rem;
  }

  .features--compact .features__grid {
    gap: 1rem;
  }

  .features--compact .feature__icon {
    width: 40px;
    height: 40px;
  }

  /* Features with cards/borders */
  .features--cards .feature,
  .features--cards .feature-item {
    background: var(--color-background, #fff);
    border: 1px solid var(--color-border, #e0e0e0);
    border-radius: 8px;
    padding: 1.5rem;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  /* Features with alternating background */
  .features--striped .feature:nth-child(even) {
    background-color: var(--color-background-alt, #f9f9f9);
  }

  /* Features left-aligned (instead of centered) */
  .features--left .feature,
  .features--left .feature-item {
    text-align: left;
    align-items: flex-start;
  }

  .features--left .feature__icon {
    margin-left: 0;
  }

  /* Features with larger icons */
  .features--large-icons .feature__icon,
  .features--large-icons .feature-icon {
    width: 64px;
    height: 64px;
  }

  .features--large-icons .feature__icon img,
  .features--large-icons .feature__icon svg {
    width: 64px;
    height: 64px;
  }

  /* Features with icon on the left (horizontal layout) */
  .features--horizontal .feature,
  .features--horizontal .feature-item {
    flex-direction: row;
    text-align: left;
    align-items: flex-start;
    gap: 1rem;
  }

  .features--horizontal .feature__icon {
    flex-shrink: 0;
    margin: 0;
  }

  .features--horizontal .feature__content {
    flex: 1;
  }

  /* Features with numbers instead of icons */
  .features--numbered .feature::before {
    content: counter(feature-counter);
    counter-increment: feature-counter;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--color-primary, #0066cc);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }

  .features--numbered .features__grid {
    counter-reset: feature-counter;
  }

  .features--numbered .feature__icon {
    display: none;
  }
}

/* Extra small phones adjustments */
@media (max-width: 390px) {
  .features--cards .feature {
    padding: 1rem;
  }

  .features--horizontal .feature {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .features--horizontal .feature__icon {
    margin-bottom: 0.75rem;
  }

  .features--large-icons .feature__icon,
  .features--large-icons .feature-icon {
    width: 48px;
    height: 48px;
  }

  .features--large-icons .feature__icon img,
  .features--large-icons .feature__icon svg {
    width: 48px;
    height: 48px;
  }
}
```

**✅ Checkpoint:** Feature variations added. Save the file.

---

### Step 3.6: Optimize Feature Icons

**Purpose:** Ensure icons load quickly and look crisp on mobile

**Option A: Use SVG Icons (Recommended)**

SVG icons scale perfectly and load fast:

```liquid
<div class="feature__icon">
  {% if block.settings.icon_svg %}
    {{ block.settings.icon_svg }}
  {% else %}
    <!-- Fallback icon -->
    <svg width="48" height="48" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
    </svg>
  {% endif %}
</div>
```

**Option B: Optimize Image Icons**

If using image icons:

```liquid
<div class="feature__icon">
  {% if block.settings.icon %}
    <img 
      src="{{ block.settings.icon | image_url: width: 96 }}" 
      alt="{{ block.settings.heading | escape }}"
      width="48"
      height="48"
      loading="lazy"
    >
  {% endif %}
</div>
```

**Benefits:**
- `width: 96` loads 2x resolution for retina displays
- `loading="lazy"` defers loading below-the-fold icons
- Explicit width/height prevents layout shift

**Option C: Icon Fonts (If already using)**

If your theme uses icon fonts (like Font Awesome):

```css
@media (max-width: 768px) {
  .feature__icon i,
  .feature__icon [class*="icon-"] {
    font-size: 48px;
  }
}

@media (max-width: 390px) {
  .feature__icon i,
  .feature__icon [class*="icon-"] {
    font-size: 40px;
  }
}
```

**✅ Checkpoint:** Icons optimized for mobile.

---

### Step 3.7: Test Features Section on Mobile

**Testing Steps:**

1. **Push changes to development theme:**
   ```bash
   shopify theme push
   ```

2. **Test on multiple screen sizes:**
   - iPhone SE (375px)
   - Standard mobile (390px)
   - Small tablet (768px)

3. **Check features section specifically:**

   **Visual Tests:**
   - [ ] Features stack vertically in single column
   - [ ] Icons are appropriate size (48px on mobile, 40px on small)
   - [ ] Icons are centered above text
   - [ ] Heading text is readable and appropriately sized
   - [ ] Description text is comfortable to read
   - [ ] Spacing between features feels right (1.5rem gap)
   - [ ] Section padding is comfortable (not cramped)

   **Layout Tests:**
   - [ ] All features are same width
   - [ ] Content is centered on mobile
   - [ ] No horizontal scrolling
   - [ ] Icons align properly with text
   - [ ] Cards (if used) display properly
   - [ ] No overlapping elements

   **Content Tests:**
   - [ ] All feature icons display correctly
   - [ ] All feature headings visible
   - [ ] All feature descriptions visible
   - [ ] Links/buttons (if present) work correctly
   - [ ] No text cutoff

   **Interactive Tests:**
   - [ ] Buttons/links are easy to tap (min 44px)
   - [ ] Cards (if used) have good touch response
   - [ ] Hover states work (if applicable)
   - [ ] No broken links

4. **Test different feature counts:**
   - 2 features
   - 3 features (most common)
   - 4+ features
   - Single feature (edge case)

5. **Test on actual device:**
   - Real iPhone or Android phone
   - Portrait and landscape modes
   - Different lighting conditions (readability)

---

### Step 3.8: Common Features Issues & Fixes

**Issue 1: Icons too small or too large**
```css
@media (max-width: 768px) {
  .feature__icon {
    width: 48px !important;
    height: 48px !important;
  }
  
  .feature__icon img,
  .feature__icon svg {
    max-width: 48px !important;
    max-height: 48px !important;
  }
}
```

**Issue 2: Features not stacking vertically**
```css
@media (max-width: 768px) {
  .features__grid {
    display: flex !important;
    flex-direction: column !important;
    gap: 1.5rem !important;
  }
}
```

**Issue 3: Text not centered**
```css
@media (max-width: 768px) {
  .feature {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
  }
}
```

**Issue 4: Too much/little spacing between features**
```css
/* Too tight - increase gap */
@media (max-width: 768px) {
  .features__grid {
    gap: 2rem;
  }
}

/* Too loose - decrease gap */
@media (max-width: 768px) {
  .features__grid {
    gap: 1rem;
  }
}
```

**Issue 5: Icons not loading**
```liquid
<!-- Add fallback icon -->
<div class="feature__icon">
  {% if block.settings.icon %}
    {{ block.settings.icon }}
  {% else %}
    <!-- Fallback SVG -->
    <svg width="48" height="48" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" fill="currentColor"/>
    </svg>
  {% endif %}
</div>
```

**Issue 6: Card borders not visible**
```css
@media (max-width: 768px) {
  .features--cards .feature {
    border: 1px solid #ddd !important;
    box-shadow: 0 2px 8px rgba(0,0,0,0.08) !important;
  }
}
```

---

### Step 3.9: Verify Features Accessibility on Mobile

**Accessibility Checklist:**

- [ ] **Semantic HTML:** Features use proper heading tags (h2, h3)
- [ ] **Icon Alt Text:** Icons have descriptive alt text or aria-labels
- [ ] **Color Contrast:** Text meets 4.5:1 contrast ratio
- [ ] **Touch Targets:** Interactive elements min 44px × 44px
- [ ] **Text Size:** Minimum 14px (preferably 16px)
- [ ] **Focus Indicators:** Links/buttons have visible focus states
- [ ] **Logical Order:** Features read in logical order
- [ ] **Screen Reader:** Test with VoiceOver (iOS) or TalkBack (Android)

**Test with:**
```html
<!-- Add aria-label to icons if needed -->
<div class="feature__icon" aria-label="Security feature">
  <svg>...</svg>
</div>

<!-- Ensure headings are semantic -->
<h3 class="feature__heading">{{ block.settings.heading }}</h3>
```

---

### Step 3.10: Document Features Implementation

**What We Optimized:**

✅ **Single column layout** on mobile (from 3-column grid)  
✅ **Reduced icon size** from 64px to 48px (40px on small screens)  
✅ **Centered layout** for better mobile UX  
✅ **Comfortable spacing** with 1.5rem gap between features  
✅ **Touch-friendly buttons** with min 44px height  
✅ **Optimized icons** with lazy loading and proper sizing  
✅ **Card variations** for different visual styles  
✅ **Flexible layouts** (centered, left-aligned, horizontal)  

**Classes Available:**
- `.features--compact` - Tighter spacing, smaller icons
- `.features--cards` - Features in bordered cards
- `.features--striped` - Alternating background colors
- `.features--left` - Left-aligned instead of centered
- `.features--large-icons` - Bigger icons (64px)
- `.features--horizontal` - Icon beside text (horizontal layout)
- `.features--numbered` - Numbered features instead of icons

**Mobile Breakpoints:**
- `768px` - Standard mobile (48px icons, 1.5rem gap)
- `390px` - Extra small phones (40px icons, 1rem gap)

---

### Step 3.11: Performance Optimization Tips

**Tip 1: Lazy load below-the-fold icons**
```liquid
{% assign loading = 'lazy' %}
{% if forloop.index <= 3 %}
  {% assign loading = 'eager' %}
{% endif %}

<img src="{{ icon }}" loading="{{ loading }}">
```

**Tip 2: Use CSS instead of images for simple icons**
```css
.feature__icon--checkmark::before {
  content: '✓';
  font-size: 48px;
  color: green;
}
```

**Tip 3: Combine multiple icons into a sprite**
```html
<svg class="icon-sprite" style="display: none;">
  <symbol id="icon-shipping" viewBox="0 0 24 24">...</symbol>
  <symbol id="icon-returns" viewBox="0 0 24 24">...</symbol>
</svg>

<svg class="feature__icon">
  <use href="#icon-shipping"></use>
</svg>
```

---

## ✅ Phase 3 Complete - Features Section Optimized!

**Results:**
- Features now stack in single column on mobile
- Icons appropriately sized for mobile screens
- Comfortable spacing and padding
- Multiple layout variations available
- Optimized for performance and accessibility

**Before moving to Phase 4:**
1. Test features on multiple pages
2. Verify all icon types display correctly
3. Test different feature counts (2, 3, 4+)
4. Confirm no regressions on desktop
5. Check performance (Lighthouse score)

---

**Next:** Phase 4 - Products Section Optimization

*Once Phase 3 testing is complete, proceed to Phase 4.*

---

## Phase 4: Products Section Optimization

**Time Estimate:** 45-60 minutes  
**Purpose:** Optimize product grid sections for mobile with 2-column layout, larger images, better touch targets, and optimized pricing/buttons

**Implementation:** Two-Column Mobile Grid (Option A)
- 2 products per row on mobile (390px+)
- Single column on extra small screens (< 390px)
- Larger product images for better visibility
- Comfortable padding around cards (0.75rem gap)
- Touch-friendly quick-add buttons

---

### Step 4.1: Locate Products Section Files

**Find product section files in your theme:**

Product sections might be in:
- `sections/featured-collection.liquid`
- `sections/product-grid.liquid`
- `sections/collection-list.liquid`
- `snippets/product-card.liquid`
- Or search for product-related files

**Action:**
```bash
# Search for product-related files
find . -name "*product*.liquid" -o -name "*collection*.liquid" | grep -E "(sections|snippets)"
```

**Note the files found:** _________________

**Key files to modify:**
- Product grid container section
- Product card snippet (if separate)

---

### Step 4.2: Create Backups

**Before making any changes:**

```bash
# Backup product grid section
cp sections/featured-collection.liquid sections/backup_featured-collection.liquid

# Backup product card snippet if exists
cp snippets/product-card.liquid snippets/backup_product-card.liquid
```

**✅ Checkpoint:** Backups created

---

### Step 4.3: Add Products Mobile CSS

**Location:** Add to your global CSS file (after Phase 3 code)

**Purpose:** Mobile-optimized product grid and card styling

**Add this code:**

```css
/* ============================================
   PRODUCTS SECTION MOBILE OPTIMIZATION - Phase 4
   ============================================ */

@media (max-width: 768px) {
  /* Product grid container */
  .product-grid,
  .collection-grid,
  .featured-collection,
  [class*="product-grid"] {
    padding: 2.5rem 1.25rem;
  }

  /* Product grid - 2 columns on mobile */
  .product-grid__items,
  .product-grid__list,
  .collection__products,
  .featured-collection__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    width: 100%;
  }

  /* Individual product card */
  .product-card,
  .product-item,
  .grid__item {
    display: flex;
    flex-direction: column;
    position: relative;
    background: var(--color-background, #fff);
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .product-card:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Product image container */
  .product-card__image-wrapper,
  .product-card__media,
  .product-item__image {
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* 1:1 aspect ratio */
    overflow: hidden;
    background: var(--color-background, #f9f9f9);
  }

  .product-card__image,
  .product-card__media img,
  .product-item__image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .product-card:hover .product-card__image,
  .product-card:hover .product-card__media img {
    transform: scale(1.05);
  }

  /* Product info section */
  .product-card__info,
  .product-card__content,
  .product-item__info {
    padding: 0.75rem;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    flex: 1;
  }

  /* Product vendor/brand */
  .product-card__vendor,
  .product-item__vendor {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.25rem;
  }

  /* Product title */
  .product-card__title,
  .product-card__name,
  .product-item__title {
    font-size: 0.875rem;
    line-height: 1.4;
    font-weight: 500;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .product-card__title a,
  .product-card__name a,
  .product-item__title a {
    color: inherit;
    text-decoration: none;
  }

  /* Product price */
  .product-card__price,
  .product-item__price,
  .price {
    font-size: 0.9375rem;
    font-weight: 600;
    margin-top: auto;
  }

  .price__regular,
  .product-card__price--regular {
    color: var(--color-text, #000);
  }

  .price__sale,
  .product-card__price--sale {
    color: var(--color-sale, #c41e3a);
  }

  .price__compare,
  .product-card__price--compare {
    font-size: 0.8125rem;
    color: var(--color-text-secondary, #999);
    text-decoration: line-through;
    margin-left: 0.5rem;
  }

  /* Sale badge */
  .product-card__badge,
  .product-badge,
  .badge--sale {
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    background: var(--color-sale, #c41e3a);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 600;
    z-index: 2;
  }

  /* Sold out badge */
  .badge--sold-out {
    background: var(--color-text-secondary, #666);
  }

  /* Quick add button */
  .product-card__quick-add,
  .quick-add-button,
  .product-item__quick-add {
    width: 100%;
    min-height: 44px;
    padding: 0.625rem 0.75rem;
    font-size: 0.875rem;
    margin-top: 0.5rem;
    border-radius: 6px;
    background: var(--color-button, #000);
    color: var(--color-button-text, #fff);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .product-card__quick-add:active {
    transform: scale(0.98);
  }

  /* Product variants/swatches (if present) */
  .product-card__swatches,
  .product-swatches {
    display: flex;
    gap: 0.25rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;
  }

  .product-card__swatch,
  .product-swatch {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid #ddd;
    cursor: pointer;
  }

  /* Product rating (if present) */
  .product-card__rating,
  .product-rating {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
  }

  .product-card__rating svg,
  .product-rating svg {
    width: 14px;
    height: 14px;
    fill: var(--color-rating, #ffc107);
  }
}

/* Extra small phones - single column */
@media (max-width: 390px) {
  .product-grid,
  .collection-grid,
  .featured-collection,
  [class*="product-grid"] {
    padding: 2rem 1rem;
  }

  /* Single column on very small screens */
  .product-grid__items,
  .product-grid__list,
  .collection__products,
  .featured-collection__grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .product-card__info,
  .product-card__content,
  .product-item__info {
    padding: 1rem;
  }

  .product-card__title,
  .product-card__name,
  .product-item__title {
    font-size: 1rem;
    -webkit-line-clamp: 3;
  }

  .product-card__price,
  .product-item__price,
  .price {
    font-size: 1rem;
  }

  .product-card__quick-add,
  .quick-add-button {
    min-height: 48px;
    font-size: 0.9375rem;
    padding: 0.75rem 1rem;
  }
}
```

**✅ Checkpoint:** Products mobile CSS added. Save the file.

---

### Step 4.4: Add Product Grid Section Header Styles

**Location:** Add immediately after the product grid CSS

**Purpose:** Style the section heading and filters above the product grid

**Add this code:**

```css
/* Product Grid Section Header */
@media (max-width: 768px) {
  /* Section heading */
  .product-grid__header,
  .collection__header,
  .featured-collection__header {
    padding: 1.5rem 1.25rem 1rem;
    text-align: center;
  }

  .product-grid__heading,
  .collection__heading,
  .featured-collection__heading {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
  }

  .product-grid__description,
  .collection__description {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin-bottom: 1rem;
    max-width: 100%;
  }

  /* Filter/sort controls */
  .product-grid__filters,
  .collection__filters,
  .facets-wrapper {
    padding: 1rem 1.25rem;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .facet-filters,
  .filter-group {
    width: 100%;
  }

  .facet-filters__button,
  .filter-button {
    width: 100%;
    min-height: 48px;
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: var(--color-background, #fff);
    border: 1px solid var(--color-border, #ddd);
    border-radius: 6px;
  }

  /* Sort dropdown */
  .product-grid__sort,
  .collection__sort,
  .sort-by {
    width: 100%;
  }

  .product-grid__sort select,
  .collection__sort select,
  .sort-by select {
    width: 100%;
    min-height: 48px;
    font-size: 0.9375rem;
    padding: 0.75rem 1rem;
    border-radius: 6px;
  }

  /* Product count */
  .product-count,
  .collection__count {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #666);
    text-align: center;
    padding: 0.5rem 1.25rem;
  }
}

@media (max-width: 390px) {
  .product-grid__header,
  .collection__header,
  .featured-collection__header {
    padding: 1.25rem 1rem 0.75rem;
  }

  .product-grid__heading,
  .collection__heading,
  .featured-collection__heading {
    font-size: 1.5rem;
  }

  .product-grid__filters,
  .collection__filters {
    padding: 0.75rem 1rem;
  }
}
```

**✅ Checkpoint:** Section header styles added. Save the file.

---

### Step 4.5: Update Product Card Markup (If Needed)

**This step is OPTIONAL** - Only if product cards need class adjustments.

**Location:** In your product card file (e.g., `snippets/product-card.liquid`)

**Before:**
```liquid
<div class="product-card">
  <a href="{{ product.url }}">
    <div class="product-card__image-wrapper">
      <img src="{{ product.featured_image | image_url }}" alt="{{ product.title }}">
    </div>
  </a>
  <div class="product-card__info">
    <h3 class="product-card__title">
      <a href="{{ product.url }}">{{ product.title }}</a>
    </h3>
    <div class="product-card__price">
      {{ product.price | money }}
    </div>
  </div>
</div>
```

**After (optimized for mobile):**
```liquid
<div class="product-card mobile-card">
  <a href="{{ product.url }}" class="product-card__link">
    <div class="product-card__image-wrapper mobile-aspect-1-1">
      {% if product.featured_image %}
        <img 
          src="{{ product.featured_image | image_url: width: 400 }}"
          srcset="{{ product.featured_image | image_url: width: 200 }} 200w,
                  {{ product.featured_image | image_url: width: 400 }} 400w,
                  {{ product.featured_image | image_url: width: 600 }} 600w"
          sizes="(max-width: 390px) 100vw, (max-width: 768px) 50vw, 400px"
          alt="{{ product.title | escape }}"
          class="product-card__image"
          loading="lazy"
          width="400"
          height="400"
        >
      {% endif %}
    </div>
    
    {% if product.compare_at_price > product.price %}
      <span class="product-card__badge badge--sale">Sale</span>
    {% endif %}
    
    {% unless product.available %}
      <span class="product-card__badge badge--sold-out">Sold Out</span>
    {% endunless %}
  </a>
  
  <div class="product-card__info">
    {% if product.vendor %}
      <p class="product-card__vendor">{{ product.vendor }}</p>
    {% endif %}
    
    <h3 class="product-card__title">
      <a href="{{ product.url }}">{{ product.title }}</a>
    </h3>
    
    <div class="product-card__price price">
      {% if product.compare_at_price > product.price %}
        <span class="price__sale">{{ product.price | money }}</span>
        <span class="price__compare">{{ product.compare_at_price | money }}</span>
      {% else %}
        <span class="price__regular">{{ product.price | money }}</span>
      {% endif %}
    </div>
    
    {% if product.available %}
      <button class="product-card__quick-add" type="button" data-product-id="{{ product.id }}">
        Quick Add
      </button>
    {% endif %}
  </div>
</div>
```

**Key improvements:**
- Responsive images with `srcset` and `sizes`
- Lazy loading for better performance
- Sale and sold-out badges
- Vendor display
- Quick add button (if available)
- Better semantic structure

**✅ Checkpoint:** Product card markup updated. Save the file.

---

### Step 4.6: Add Product Grid Variations

**Location:** Add to global CSS file (after product grid CSS)

**Purpose:** Different product grid styles for various needs

**Add this code:**

```css
/* Product Grid Variations */
@media (max-width: 768px) {
  /* Compact product grid - smaller images, tighter spacing */
  .product-grid--compact .product-grid__items {
    gap: 0.5rem;
  }

  .product-grid--compact .product-card__info {
    padding: 0.5rem;
  }

  .product-grid--compact .product-card__title {
    font-size: 0.8125rem;
  }

  .product-grid--compact .product-card__image-wrapper {
    padding-bottom: 80%; /* Shorter aspect ratio */
  }

  /* List view - single column with horizontal layout */
  .product-grid--list .product-grid__items {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .product-grid--list .product-card {
    flex-direction: row;
  }

  .product-grid--list .product-card__image-wrapper {
    width: 120px;
    padding-bottom: 0;
    height: 120px;
    flex-shrink: 0;
  }

  .product-grid--list .product-card__info {
    flex: 1;
  }

  /* Large images - more visual emphasis */
  .product-grid--large-images .product-card__image-wrapper {
    padding-bottom: 120%; /* Taller aspect ratio */
  }

  /* Minimal cards - no borders */
  .product-grid--minimal .product-card {
    border: none;
    background: transparent;
  }

  .product-grid--minimal .product-card__info {
    padding: 0.5rem 0;
  }

  /* Featured product - larger in grid */
  .product-card--featured {
    grid-column: span 2;
  }

  .product-card--featured .product-card__title {
    font-size: 1rem;
    -webkit-line-clamp: 3;
  }

  .product-card--featured .product-card__price {
    font-size: 1.125rem;
  }
}

/* Extra small phones adjustments */
@media (max-width: 390px) {
  .product-grid--list .product-card__image-wrapper {
    width: 100px;
    height: 100px;
  }

  .product-grid--list .product-card__title {
    font-size: 0.875rem;
  }

  /* Featured product takes full width */
  .product-card--featured {
    grid-column: span 1;
  }
}
```

**✅ Checkpoint:** Product grid variations added. Save the file.

---

### Step 4.7: Optimize Product Images

**Purpose:** Ensure product images load quickly and look sharp on mobile

**Add responsive image loading:**

```liquid
{%- comment -%} Optimized product image with responsive sizing {%- endcomment -%}
{% assign image_size = '400x400' %}

<img 
  src="{{ product.featured_image | image_url: width: 400 }}"
  srcset="{{ product.featured_image | image_url: width: 200 }} 200w,
          {{ product.featured_image | image_url: width: 400 }} 400w,
          {{ product.featured_image | image_url: width: 600 }} 600w"
  sizes="(max-width: 390px) 100vw, (max-width: 768px) 50vw, 25vw"
  alt="{{ product.title | escape }}"
  loading="{% if forloop.index <= 4 %}eager{% else %}lazy{% endif %}"
  width="400"
  height="400"
  class="product-card__image"
>
```

**Benefits:**
- First 4 products load immediately (`eager`)
- Rest load as user scrolls (`lazy`)
- Appropriate image size for screen width
- 2x resolution for retina displays

**✅ Checkpoint:** Product images optimized.

---

### Step 4.8: Test Products Section on Mobile

**Testing Steps:**

1. **Push changes to development theme:**
   ```bash
   shopify theme push
   ```

2. **Test on multiple screen sizes:**
   - iPhone SE (375px) - Single column
   - Standard mobile (390px-768px) - 2 columns
   - Small tablet (768px+) - May show more columns

3. **Check product grid specifically:**

   **Visual Tests:**
   - [ ] Products display in 2 columns (390px+) or 1 column (< 390px)
   - [ ] Product images are clear and sized appropriately
   - [ ] Product images maintain 1:1 aspect ratio (square)
   - [ ] Product titles are readable (2-line truncation)
   - [ ] Prices are clear and properly formatted
   - [ ] Sale prices show in red with strikethrough compare price
   - [ ] Badges (sale, sold out) display correctly
   - [ ] Gap between products is comfortable (0.75rem)

   **Layout Tests:**
   - [ ] All product cards are same size
   - [ ] Cards align properly in grid
   - [ ] No horizontal scrolling
   - [ ] Images don't distort or stretch
   - [ ] Text doesn't overflow cards
   - [ ] Quick add buttons visible and aligned

   **Interactive Tests:**
   - [ ] Product images are tappable (link to product page)
   - [ ] Product titles are tappable
   - [ ] Quick add buttons work (min 44px height)
   - [ ] Buttons have good touch response
   - [ ] Hover effects work on tap (mobile)
   - [ ] No double-tap needed

   **Content Tests:**
   - [ ] All product data displays correctly
   - [ ] Images load progressively
   - [ ] Vendor names show (if applicable)
   - [ ] Ratings show (if applicable)
   - [ ] Color swatches work (if applicable)

4. **Test different product counts:**
   - Grid with 2 products
   - Grid with 3-6 products (common)
   - Grid with 12+ products (pagination)
   - Empty state (no products)

5. **Test variations:**
   - Products with long titles
   - Products with/without vendor
   - Products on sale
   - Sold out products
   - Products with variants

6. **Performance check:**
   - [ ] Images lazy load below fold
   - [ ] First 4 products load quickly
   - [ ] No layout shift when images load
   - [ ] Lighthouse score > 80

---

### Step 4.9: Common Products Issues & Fixes

**Issue 1: Images distorted or stretched**
```css
@media (max-width: 768px) {
  .product-card__image {
    object-fit: cover !important;
    object-position: center !important;
  }
}
```

**Issue 2: Products not showing 2 columns**
```css
@media (max-width: 768px) {
  .product-grid__items {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.75rem !important;
  }
}
```

**Issue 3: Product titles too long (overflow)**
```css
@media (max-width: 768px) {
  .product-card__title {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    display: -webkit-box !important;
    -webkit-line-clamp: 2 !important;
    -webkit-box-orient: vertical !important;
  }
}
```

**Issue 4: Quick add button too small**
```css
@media (max-width: 768px) {
  .product-card__quick-add {
    min-height: 48px !important;
    width: 100% !important;
  }
}
```

**Issue 5: Images loading slowly**
```liquid
<!-- Add loading attribute -->
<img loading="lazy" ...>

<!-- Or use JavaScript lazy loading -->
<img data-src="{{ image }}" class="lazyload">
```

**Issue 6: Price not visible**
```css
@media (max-width: 768px) {
  .product-card__price {
    font-weight: 600 !important;
    color: #000 !important;
    margin-top: auto !important;
  }
}
```

---

### Step 4.10: Verify Products Accessibility on Mobile

**Accessibility Checklist:**

- [ ] **Product titles**: Use semantic heading tags (h3 or h4)
- [ ] **Image alt text**: Descriptive alt text for all product images
- [ ] **Links**: Product card links have accessible names
- [ ] **Buttons**: Quick add buttons have labels
- [ ] **Color contrast**: Price text meets 4.5:1 ratio
- [ ] **Touch targets**: All buttons min 44px × 44px
- [ ] **Focus states**: Visible focus indicators
- [ ] **Sale info**: Screen reader announces sale prices
- [ ] **Sold out**: Clear indication for sold out products

**Test with screen reader:**
```html
<!-- Accessible product card example -->
<article class="product-card" aria-label="{{ product.title }}">
  <a href="{{ product.url }}" aria-label="View {{ product.title }}">
    <img alt="{{ product.title | escape }}" ...>
  </a>
  
  {% unless product.available %}
    <span class="badge--sold-out" aria-label="Sold out">Sold Out</span>
  {% endunless %}
  
  <button aria-label="Quick add {{ product.title }} to cart">
    Quick Add
  </button>
</article>
```

---

### Step 4.11: Document Products Implementation

**What We Optimized:**

✅ **2-column grid** on mobile (1 column on extra small screens)  
✅ **Larger images** with 1:1 aspect ratio for better visibility  
✅ **Responsive images** with srcset for performance  
✅ **Touch-friendly buttons** min 44px height  
✅ **Optimized card layout** with comfortable spacing  
✅ **Sale badges** and sold-out indicators  
✅ **Lazy loading** for images below the fold  
✅ **Quick add functionality** with prominent buttons  
✅ **Multiple grid variations** for different use cases  

**Classes Available:**
- `.product-grid--compact` - Tighter spacing, smaller images
- `.product-grid--list` - Single column horizontal layout
- `.product-grid--large-images` - Taller product images
- `.product-grid--minimal` - No borders, clean design
- `.product-card--featured` - Featured product (spans 2 columns)

**Mobile Breakpoints:**
- `768px` - 2-column grid with 0.75rem gap
- `390px` - Single column with 1rem gap

**Performance:**
- First 4 products: `loading="eager"`
- Remaining products: `loading="lazy"`
- Responsive images with `srcset`
- 1:1 aspect ratio prevents layout shift

---

## ✅ Phase 4 Complete - Products Section Optimized!

**Results:**
- Products display beautifully in 2-column mobile grid
- Larger images improve product visibility
- Touch-friendly interface with proper button sizes
- Optimized for performance with lazy loading
- Multiple layout variations available
- Accessible and user-friendly

**Before moving to Phase 5:**
1. Test product grid on collection pages
2. Verify quick add functionality works
3. Test with different product counts
4. Check sale/sold-out badges
5. Verify images load correctly
6. Test on actual mobile device

---

**Next:** Phase 5 - Collection List Section Optimization

*Once Phase 4 testing is complete, proceed to Phase 5.*

---

## Phase 5: Collection List Section Optimization

**Time Estimate:** 30-45 minutes  
**Purpose:** Optimize collection list sections for mobile with 2-column grid, square images, clear collection names, and product counts

**Implementation:** Two-Column Collection Grid (Option A)
- 2 collections per row on mobile
- Square collection images (1:1 aspect ratio)
- Collection title overlays on images
- Product count display
- Touch-friendly cards with full-width tap targets

---

### Step 5.1: Locate Collection List Files

**Find collection list section files in your theme:**

Collection sections might be in:
- `sections/collection-list.liquid`
- `sections/featured-collections.liquid`
- `snippets/collection-card.liquid`
- Or search for collection-related files

**Action:**
```bash
# Search for collection list files
find . -name "*collection*.liquid" | grep -E "(sections|snippets)" | grep -v product
```

**Note the files found:** _________________

**Key files to modify:**
- Collection list section
- Collection card snippet (if separate)

---

### Step 5.2: Create Backups

**Before making any changes:**

```bash
# Backup collection list section
cp sections/collection-list.liquid sections/backup_collection-list.liquid

# Backup featured collections if exists
cp sections/featured-collections.liquid sections/backup_featured-collections.liquid

# Backup collection card snippet if exists
cp snippets/collection-card.liquid snippets/backup_collection-card.liquid
```

**✅ Checkpoint:** Backups created

---

### Step 5.3: Add Collection List Mobile CSS

**Location:** Add to your global CSS file (after Phase 4 code)

**Purpose:** Mobile-optimized collection grid with overlays and touch targets

**Add this code:**

```css
/* ============================================
   COLLECTION LIST SECTION MOBILE OPTIMIZATION - Phase 5
   ============================================ */

@media (max-width: 768px) {
  /* Collection list container */
  .collection-list,
  .featured-collections,
  .collections-grid,
  [class*="collection-list"] {
    padding: 2.5rem 1.25rem;
  }

  /* Collection list heading */
  .collection-list__heading,
  .featured-collections__heading {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  /* Collection grid - 2 columns */
  .collection-list__items,
  .collection-list__grid,
  .collections-grid__items,
  .featured-collections__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    width: 100%;
  }

  /* Individual collection card */
  .collection-card,
  .collection-item,
  .collection-list__item {
    position: relative;
    display: block;
    border-radius: 8px;
    overflow: hidden;
    background: var(--color-background, #fff);
    transition: all 0.2s ease;
  }

  .collection-card:active {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
  }

  /* Collection image wrapper - square aspect ratio */
  .collection-card__image-wrapper,
  .collection-card__media,
  .collection-item__image {
    position: relative;
    width: 100%;
    padding-bottom: 100%; /* 1:1 aspect ratio */
    overflow: hidden;
    background: var(--color-background-secondary, #f5f5f5);
  }

  /* Collection image */
  .collection-card__image,
  .collection-card__media img,
  .collection-item__image img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .collection-card:hover .collection-card__image,
  .collection-card:active .collection-card__image {
    transform: scale(1.05);
  }

  /* Dark overlay for better text contrast */
  .collection-card__overlay,
  .collection-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.3) 50%,
      rgba(0, 0, 0, 0.7) 100%
    );
    z-index: 1;
    transition: opacity 0.2s ease;
  }

  .collection-card:hover .collection-card__overlay,
  .collection-card:active::before {
    opacity: 0.9;
  }

  /* Collection info - overlaid on image */
  .collection-card__info,
  .collection-card__content,
  .collection-item__info {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem 0.75rem;
    z-index: 2;
    color: white;
    text-align: center;
  }

  /* Collection title */
  .collection-card__title,
  .collection-card__heading,
  .collection-item__title {
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.3;
    margin: 0 0 0.25rem 0;
    color: white;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  .collection-card__title a,
  .collection-card__heading a {
    color: inherit;
    text-decoration: none;
  }

  /* Product count */
  .collection-card__count,
  .collection-card__product-count,
  .collection-item__count {
    font-size: 0.8125rem;
    color: rgba(255, 255, 255, 0.9);
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
    margin: 0;
  }

  /* Collection description (if present) */
  .collection-card__description {
    font-size: 0.75rem;
    line-height: 1.4;
    color: rgba(255, 255, 255, 0.85);
    margin-top: 0.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }

  /* Collection link - full card clickable */
  .collection-card__link,
  .collection-item__link {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
    text-indent: -9999px;
  }

  /* View all button (if not using overlay style) */
  .collection-card__button,
  .collection-item__button {
    display: inline-block;
    margin-top: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
    background: rgba(255, 255, 255, 0.2);
    color: white;
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 4px;
    backdrop-filter: blur(10px);
    transition: all 0.2s ease;
  }

  .collection-card__button:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
  }

  /* Empty state - collection with no image */
  .collection-card--no-image .collection-card__image-wrapper {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .collection-card--no-image .collection-card__title {
    position: static;
    padding: 0;
  }
}

/* Extra small phones - single column or keep 2 columns */
@media (max-width: 390px) {
  .collection-list,
  .featured-collections,
  .collections-grid {
    padding: 2rem 1rem;
  }

  /* Keep 2 columns but adjust spacing */
  .collection-list__items,
  .collection-list__grid,
  .collections-grid__items,
  .featured-collections__grid {
    gap: 0.5rem;
  }

  .collection-card__info,
  .collection-card__content {
    padding: 0.75rem 0.5rem;
  }

  .collection-card__title,
  .collection-card__heading {
    font-size: 0.875rem;
  }

  .collection-card__count,
  .collection-card__product-count {
    font-size: 0.75rem;
  }

  .collection-card__description {
    display: none; /* Hide description on very small screens */
  }
}
```

**✅ Checkpoint:** Collection list mobile CSS added. Save the file.

---

### Step 5.4: Add Collection List Variations

**Location:** Add immediately after the collection list CSS

**Purpose:** Different collection display styles for various needs

**Add this code:**

```css
/* Collection List Variations */
@media (max-width: 768px) {
  /* Compact collections - smaller cards with less spacing */
  .collection-list--compact .collection-list__items {
    gap: 0.5rem;
  }

  .collection-list--compact .collection-card__info {
    padding: 0.5rem;
  }

  .collection-list--compact .collection-card__title {
    font-size: 0.875rem;
  }

  .collection-list--compact .collection-card__count {
    font-size: 0.75rem;
  }

  /* Single column - full width collections */
  .collection-list--single-column .collection-list__items {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .collection-list--single-column .collection-card__image-wrapper {
    padding-bottom: 60%; /* 16:9-ish aspect ratio */
  }

  .collection-list--single-column .collection-card__info {
    padding: 1.25rem 1rem;
  }

  .collection-list--single-column .collection-card__title {
    font-size: 1.25rem;
  }

  /* Bordered style - cards with borders instead of overlays */
  .collection-list--bordered .collection-card {
    border: 1px solid var(--color-border, #e5e5e5);
    background: white;
  }

  .collection-list--bordered .collection-card::before,
  .collection-list--bordered .collection-card__overlay {
    display: none;
  }

  .collection-list--bordered .collection-card__info {
    position: static;
    padding: 0.75rem;
    background: white;
    color: var(--color-text, #000);
  }

  .collection-list--bordered .collection-card__title {
    color: var(--color-text, #000);
    text-shadow: none;
  }

  .collection-list--bordered .collection-card__count {
    color: var(--color-text-secondary, #666);
    text-shadow: none;
  }

  /* Minimal style - no overlays, text below image */
  .collection-list--minimal .collection-card::before,
  .collection-list--minimal .collection-card__overlay {
    display: none;
  }

  .collection-list--minimal .collection-card__info {
    position: static;
    padding: 0.75rem 0;
    color: var(--color-text, #000);
    text-align: left;
  }

  .collection-list--minimal .collection-card__title {
    color: var(--color-text, #000);
    text-shadow: none;
    font-size: 0.9375rem;
  }

  .collection-list--minimal .collection-card__count {
    color: var(--color-text-secondary, #666);
    text-shadow: none;
  }

  /* Rounded style - circular collection images */
  .collection-list--rounded .collection-card__image-wrapper {
    border-radius: 50%;
  }

  .collection-list--rounded .collection-card {
    border-radius: 0;
  }

  .collection-list--rounded .collection-card::before {
    border-radius: 50%;
  }

  /* Large cards - fewer per row, bigger impact */
  .collection-list--large .collection-list__items {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .collection-list--large .collection-card__image-wrapper {
    padding-bottom: 80%;
  }

  .collection-list--large .collection-card__info {
    padding: 1.5rem 1rem;
  }

  .collection-list--large .collection-card__title {
    font-size: 1.5rem;
  }

  .collection-list--large .collection-card__description {
    display: block;
    font-size: 0.875rem;
  }
}

@media (max-width: 390px) {
  /* Single column variations stay single column */
  .collection-list--single-column .collection-card__title {
    font-size: 1.125rem;
  }

  .collection-list--large .collection-card__title {
    font-size: 1.25rem;
  }
}
```

**✅ Checkpoint:** Collection list variations added. Save the file.

---

### Step 5.5: Update Collection Card Markup (If Needed)

**This step is OPTIONAL** - Only if collection cards need markup adjustments.

**Location:** In your collection list file (e.g., `sections/collection-list.liquid`)

**Before:**
```liquid
<div class="collection-card">
  <a href="{{ collection.url }}">
    <img src="{{ collection.image | image_url }}" alt="{{ collection.title }}">
    <h3>{{ collection.title }}</h3>
  </a>
</div>
```

**After (optimized for mobile):**
```liquid
<article class="collection-card mobile-card">
  <div class="collection-card__image-wrapper">
    {% if collection.image %}
      <img 
        src="{{ collection.image | image_url: width: 400 }}"
        srcset="{{ collection.image | image_url: width: 200 }} 200w,
                {{ collection.image | image_url: width: 400 }} 400w,
                {{ collection.image | image_url: width: 600 }} 600w"
        sizes="(max-width: 390px) 50vw, (max-width: 768px) 50vw, 400px"
        alt="{{ collection.title | escape }}"
        class="collection-card__image"
        loading="lazy"
        width="400"
        height="400"
      >
    {% else %}
      {%- comment -%} Fallback gradient for collections without images {%- endcomment -%}
      <div class="collection-card__placeholder"></div>
    {% endif %}
  </div>
  
  <div class="collection-card__overlay"></div>
  
  <div class="collection-card__info">
    <h3 class="collection-card__title">
      <a href="{{ collection.url }}">{{ collection.title }}</a>
    </h3>
    
    {% if collection.products_count > 0 %}
      <p class="collection-card__count">
        {{ collection.products_count }} 
        {% if collection.products_count == 1 %}product{% else %}products{% endif %}
      </p>
    {% endif %}
    
    {% if collection.description != blank and show_description %}
      <p class="collection-card__description">
        {{ collection.description | strip_html | truncate: 80 }}
      </p>
    {% endif %}
  </div>
  
  <a href="{{ collection.url }}" class="collection-card__link" aria-label="View {{ collection.title }} collection">
    {{ collection.title }}
  </a>
</article>
```

**Key improvements:**
- Responsive images with `srcset` and `sizes`
- Lazy loading for performance
- Accessible link covering entire card
- Product count display
- Optional description with truncation
- Fallback for collections without images
- Semantic HTML with `<article>` tag

**✅ Checkpoint:** Collection card markup updated. Save the file.

---

### Step 5.6: Optimize Collection Images

**Purpose:** Ensure collection images load quickly and display beautifully

**Add responsive image code:**

```liquid
{%- comment -%} Optimized collection image {%- endcomment -%}
{% if collection.image %}
  <img 
    src="{{ collection.image | image_url: width: 400 }}"
    srcset="{{ collection.image | image_url: width: 200 }} 200w,
            {{ collection.image | image_url: width: 400 }} 400w,
            {{ collection.image | image_url: width: 800 }} 800w"
    sizes="(max-width: 390px) 50vw, (max-width: 768px) 50vw, 25vw"
    alt="{{ collection.title | escape }}"
    loading="{% if forloop.index <= 4 %}eager{% else %}lazy{% endif %}"
    width="400"
    height="400"
    class="collection-card__image"
  >
{% else %}
  {%- comment -%} Fallback for collections without featured images {%- endcomment -%}
  <div class="collection-card__image-wrapper collection-card--no-image">
    <span class="collection-card__placeholder-text">{{ collection.title }}</span>
  </div>
{% endif %}
```

**Add CSS for placeholder:**
```css
@media (max-width: 768px) {
  .collection-card--no-image {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .collection-card__placeholder-text {
    font-size: 1.25rem;
    font-weight: 600;
    color: white;
    text-align: center;
    padding: 1rem;
  }
}
```

**✅ Checkpoint:** Collection images optimized.

---

### Step 5.7: Add Collection List Section Settings

**Purpose:** Allow section customization through theme editor

**Add to your collection list section schema (optional):**

```liquid
{% schema %}
{
  "name": "Collection List",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Shop by Collection"
    },
    {
      "type": "select",
      "id": "layout_style",
      "label": "Mobile Layout Style",
      "options": [
        {
          "value": "default",
          "label": "2 Columns (Overlay Text)"
        },
        {
          "value": "bordered",
          "label": "2 Columns (Bordered Cards)"
        },
        {
          "value": "minimal",
          "label": "2 Columns (Minimal)"
        },
        {
          "value": "single-column",
          "label": "Single Column"
        }
      ],
      "default": "default"
    },
    {
      "type": "checkbox",
      "id": "show_product_count",
      "label": "Show product count",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_description",
      "label": "Show collection description on mobile",
      "default": false
    }
  ],
  "blocks": [
    {
      "type": "collection",
      "name": "Collection",
      "settings": [
        {
          "type": "collection",
          "id": "collection",
          "label": "Collection"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Collection List",
      "blocks": [
        {
          "type": "collection"
        },
        {
          "type": "collection"
        },
        {
          "type": "collection"
        },
        {
          "type": "collection"
        }
      ]
    }
  ]
}
{% endschema %}
```

**Apply the layout style class:**
```liquid
<div class="collection-list collection-list--{{ section.settings.layout_style }}">
  <!-- Collection cards here -->
</div>
```

**✅ Checkpoint:** Section settings configured.

---

### Step 5.8: Test Collection List on Mobile

**Testing Steps:**

1. **Push changes to development theme:**
   ```bash
   shopify theme push
   ```

2. **Test on multiple screen sizes:**
   - iPhone SE (375px) - 2 columns with tight spacing
   - Standard mobile (390px-768px) - 2 columns
   - Tablet (768px+) - May show more columns

3. **Check collection grid specifically:**

   **Visual Tests:**
   - [ ] Collections display in 2 columns
   - [ ] Collection images are square (1:1 aspect ratio)
   - [ ] Images are clear and properly cropped
   - [ ] Overlay gradient is visible and readable
   - [ ] Collection titles are clearly visible on overlay
   - [ ] Product counts display correctly
   - [ ] Gap between cards is comfortable (0.75rem)

   **Layout Tests:**
   - [ ] All collection cards are same size
   - [ ] Cards align properly in grid
   - [ ] No horizontal scrolling
   - [ ] Images don't distort or stretch
   - [ ] Text is readable over images
   - [ ] Overlay creates good contrast

   **Interactive Tests:**
   - [ ] Entire card is tappable (min 44px height)
   - [ ] Tap targets don't overlap
   - [ ] Hover effect works (image zoom)
   - [ ] Active state provides feedback
   - [ ] Links navigate to collection pages
   - [ ] No double-tap needed

   **Content Tests:**
   - [ ] All collection titles display correctly
   - [ ] Product counts are accurate
   - [ ] Collections without images show placeholder
   - [ ] Long collection names truncate properly
   - [ ] Description displays if enabled

4. **Test different collection counts:**
   - 2 collections (single row)
   - 4 collections (two rows)
   - 6+ collections (multiple rows)
   - Odd number of collections

5. **Test variations:**
   - Collections with images
   - Collections without images
   - Collections with long names
   - Collections with 0 products
   - Different layout styles (bordered, minimal, single-column)

6. **Performance check:**
   - [ ] Images lazy load properly
   - [ ] No layout shift when images load
   - [ ] Page loads quickly
   - [ ] Smooth scrolling

---

### Step 5.9: Common Collection List Issues & Fixes

**Issue 1: Text not visible over images**
```css
@media (max-width: 768px) {
  .collection-card::before {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 0.8) 100%
    ) !important;
  }
}
```

**Issue 2: Collections not showing in 2 columns**
```css
@media (max-width: 768px) {
  .collection-list__items {
    display: grid !important;
    grid-template-columns: repeat(2, 1fr) !important;
    gap: 0.75rem !important;
  }
}
```

**Issue 3: Images distorted (not square)**
```css
@media (max-width: 768px) {
  .collection-card__image-wrapper {
    padding-bottom: 100% !important;
  }
  
  .collection-card__image {
    object-fit: cover !important;
    object-position: center !important;
  }
}
```

**Issue 4: Card not fully tappable**
```css
@media (max-width: 768px) {
  .collection-card__link {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    right: 0 !important;
    bottom: 0 !important;
    z-index: 3 !important;
  }
}
```

**Issue 5: Product count not showing**
```liquid
{% if collection.products_count > 0 %}
  <p class="collection-card__count">
    {{ collection.products_count }} products
  </p>
{% endif %}
```

**Issue 6: Placeholder not working for collections without images**
```css
@media (max-width: 768px) {
  .collection-card--no-image .collection-card__image-wrapper {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%) !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
}
```

---

### Step 5.10: Verify Collection List Accessibility

**Accessibility Checklist:**

- [ ] **Collection titles**: Use semantic heading tags (h3)
- [ ] **Image alt text**: Descriptive alt text for collection images
- [ ] **Links**: Collection links have accessible names
- [ ] **Touch targets**: Full card min 44px × 44px
- [ ] **Color contrast**: Text over images meets 4.5:1 ratio
- [ ] **Focus states**: Visible focus indicators on links
- [ ] **Product counts**: Screen reader announces product counts
- [ ] **Keyboard navigation**: All collections keyboard accessible
- [ ] **ARIA labels**: Proper labels for full-card links

**Test with screen reader:**
```html
<!-- Accessible collection card example -->
<article class="collection-card" aria-label="{{ collection.title }} collection">
  <div class="collection-card__image-wrapper">
    <img 
      alt="{{ collection.title | escape }} collection" 
      aria-describedby="collection-count-{{ collection.id }}"
      ...
    >
  </div>
  
  <div class="collection-card__info">
    <h3 class="collection-card__title">
      {{ collection.title }}
    </h3>
    <p class="collection-card__count" id="collection-count-{{ collection.id }}">
      {{ collection.products_count }} products
    </p>
  </div>
  
  <a 
    href="{{ collection.url }}" 
    class="collection-card__link"
    aria-label="Shop {{ collection.title }} collection, {{ collection.products_count }} products"
  >
    {{ collection.title }}
  </a>
</article>
```

**Check contrast:**
```css
/* Ensure text has sufficient contrast over images */
@media (max-width: 768px) {
  .collection-card__title {
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
  }
}
```

---

### Step 5.11: Document Collection List Implementation

**What We Optimized:**

✅ **2-column grid** on mobile for efficient space use  
✅ **Square images** (1:1 aspect ratio) for consistency  
✅ **Text overlays** with gradient for visibility  
✅ **Product counts** to show collection size  
✅ **Full-card tap targets** for easy interaction  
✅ **Responsive images** with srcset for performance  
✅ **Lazy loading** for images below the fold  
✅ **6 layout variations** for different design needs  
✅ **Placeholder support** for collections without images  

**Classes Available:**
- `.collection-list--compact` - Smaller cards, tighter spacing
- `.collection-list--single-column` - Full-width collections (16:9 ratio)
- `.collection-list--bordered` - White cards with borders, text below image
- `.collection-list--minimal` - Clean style, text below image
- `.collection-list--rounded` - Circular collection images
- `.collection-list--large` - Single column, large impact cards

**Mobile Breakpoints:**
- `768px` - 2-column grid with 0.75rem gap
- `390px` - 2 columns with 0.5rem gap (tighter)

**Performance:**
- First 4 collections: `loading="eager"`
- Remaining collections: `loading="lazy"`
- Responsive images with `srcset`
- 1:1 aspect ratio prevents layout shift

**Section Settings:**
- Layout style selector (default, bordered, minimal, single-column)
- Show/hide product count
- Show/hide collection description
- Customizable heading

---

## ✅ Phase 5 Complete - Collection List Section Optimized!

**Results:**
- Collections display beautifully in 2-column grid
- Square images create visual consistency
- Text overlays ensure readability
- Full-card tap targets improve usability
- Multiple layout options for different needs
- Optimized for performance and accessibility

**Before moving to Phase 6:**
1. Test collection list on home page
2. Verify all collections load correctly
3. Test collections with/without images
4. Check product counts are accurate
5. Verify tap targets work properly
6. Test on actual mobile device

---

**Next:** Phase 6 - Image With Text Section Optimization

*Once Phase 5 testing is complete, proceed to Phase 6.*

---

## Phase 6: Image With Text Section Optimization

**Time Estimate:** 40-50 minutes  
**Purpose:** Optimize image-with-text sections for mobile with image-first stacking, full-width images, readable text, and proper spacing

**Implementation:** Image-First Stack (Option A)
- Image always appears first (top of stack)
- Full-width images for maximum impact
- Comfortable text padding and readable line lengths
- Flexible button placement
- Works for both product features and editorial content

---

### Step 6.1: Locate Image With Text Files

**Find image-with-text section files in your theme:**

Image-with-text sections might be:
- `sections/image-with-text.liquid`
- `sections/image-banner.liquid`
- `sections/rich-text-with-image.liquid`
- `sections/featured-content.liquid`
- Or search for related files

**Action:**
```bash
# Search for image-with-text files
find . -name "*image*text*.liquid" -o -name "*banner*.liquid" | grep sections
```

**Note the files found:** _________________

**Key files to modify:**
- Image-with-text section file
- Any related snippet files

---

### Step 6.2: Create Backups

**Before making any changes:**

```bash
# Backup image-with-text section
cp sections/image-with-text.liquid sections/backup_image-with-text.liquid

# Backup image banner if exists
cp sections/image-banner.liquid sections/backup_image-banner.liquid

# Backup featured content if exists
cp sections/featured-content.liquid sections/backup_featured-content.liquid
```

**✅ Checkpoint:** Backups created

---

### Step 6.3: Add Image With Text Mobile CSS

**Location:** Add to your global CSS file (after Phase 5 code)

**Purpose:** Mobile-optimized image-with-text layout with vertical stacking

**Add this code:**

```css
/* ============================================
   IMAGE WITH TEXT SECTION MOBILE OPTIMIZATION - Phase 6
   ============================================ */

@media (max-width: 768px) {
  /* Image with text container */
  .image-with-text,
  .image-banner,
  .featured-content,
  .media-with-text,
  [class*="image-with-text"] {
    padding: 0;
    margin: 0;
  }

  /* Content wrapper - stack vertically */
  .image-with-text__grid,
  .image-with-text__content-wrapper,
  .image-banner__wrapper,
  .featured-content__wrapper {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Image container - always first, full width */
  .image-with-text__media-item,
  .image-with-text__image,
  .image-banner__media,
  .featured-content__image,
  .media-with-text__media {
    order: -1; /* Always display image first */
    width: 100%;
    margin: 0;
  }

  /* Image wrapper */
  .image-with-text__media,
  .image-with-text__image-wrapper,
  .image-banner__media-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 75%; /* 4:3 aspect ratio */
    overflow: hidden;
    background: var(--color-background-secondary, #f5f5f5);
  }

  /* Image element */
  .image-with-text__media img,
  .image-with-text__image img,
  .image-banner__media img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  /* Text content container */
  .image-with-text__text-item,
  .image-with-text__content,
  .image-banner__content,
  .featured-content__text,
  .media-with-text__content {
    padding: 2rem 1.25rem;
    width: 100%;
    max-width: 100%;
  }

  /* Heading */
  .image-with-text__heading,
  .image-banner__heading,
  .featured-content__heading {
    font-size: 1.75rem;
    line-height: 1.2;
    margin-bottom: 1rem;
    font-weight: 600;
  }

  /* Subheading */
  .image-with-text__subheading,
  .image-banner__subheading {
    font-size: 1rem;
    line-height: 1.4;
    margin-bottom: 0.75rem;
    color: var(--color-text-secondary, #666);
    font-weight: 500;
  }

  /* Body text */
  .image-with-text__text,
  .image-with-text__description,
  .image-banner__text,
  .featured-content__text p {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin-bottom: 1.25rem;
    color: var(--color-text, #333);
  }

  /* Lists in content */
  .image-with-text__text ul,
  .image-with-text__text ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  .image-with-text__text li {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin-bottom: 0.5rem;
  }

  /* Button container */
  .image-with-text__buttons,
  .image-banner__buttons,
  .featured-content__buttons {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1.25rem;
  }

  /* Primary button */
  .image-with-text__button,
  .image-banner__button,
  .featured-content__button,
  .button--primary {
    width: 100%;
    min-height: 48px;
    padding: 0.875rem 1.5rem;
    font-size: 0.9375rem;
    font-weight: 600;
    text-align: center;
    border-radius: 6px;
    background: var(--color-button, #000);
    color: var(--color-button-text, #fff);
    border: 2px solid var(--color-button, #000);
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
  }

  .image-with-text__button:active {
    transform: scale(0.98);
  }

  /* Secondary button */
  .button--secondary {
    background: transparent;
    color: var(--color-button, #000);
    border: 2px solid var(--color-button, #000);
  }

  /* Link button */
  .button--link {
    background: transparent;
    border: none;
    color: var(--color-link, #000);
    text-decoration: underline;
    padding: 0.5rem 0;
    justify-content: flex-start;
  }

  /* Badge/label */
  .image-with-text__badge,
  .image-banner__badge {
    display: inline-block;
    padding: 0.375rem 0.75rem;
    font-size: 0.75rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    background: var(--color-accent, #000);
    color: white;
    border-radius: 4px;
    margin-bottom: 0.75rem;
  }

  /* Video play button (if section has video) */
  .image-with-text__play-button,
  .media-play-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 64px;
    height: 64px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2;
    transition: all 0.2s ease;
  }

  .image-with-text__play-button svg {
    width: 24px;
    height: 24px;
    fill: var(--color-text, #000);
  }
}

/* Extra small phones */
@media (max-width: 390px) {
  .image-with-text__text-item,
  .image-with-text__content,
  .image-banner__content {
    padding: 1.5rem 1rem;
  }

  .image-with-text__heading,
  .image-banner__heading {
    font-size: 1.5rem;
  }

  .image-with-text__media,
  .image-with-text__image-wrapper {
    padding-bottom: 80%; /* Slightly taller on small screens */
  }

  .image-with-text__buttons {
    gap: 0.5rem;
  }
}
```

**✅ Checkpoint:** Image with text mobile CSS added. Save the file.

---

### Step 6.4: Add Image Aspect Ratio Variations

**Location:** Add immediately after the image-with-text CSS

**Purpose:** Different image aspect ratios for various content needs

**Add this code:**

```css
/* Image Aspect Ratio Variations */
@media (max-width: 768px) {
  /* Square aspect ratio - 1:1 */
  .image-with-text--square .image-with-text__media,
  .image-with-text--aspect-square .image-with-text__image-wrapper {
    padding-bottom: 100%;
  }

  /* Landscape aspect ratio - 16:9 */
  .image-with-text--landscape .image-with-text__media,
  .image-with-text--aspect-landscape .image-with-text__image-wrapper {
    padding-bottom: 56.25%; /* 16:9 */
  }

  /* Portrait aspect ratio - 3:4 */
  .image-with-text--portrait .image-with-text__media,
  .image-with-text--aspect-portrait .image-with-text__image-wrapper {
    padding-bottom: 133.33%; /* 3:4 */
  }

  /* Wide aspect ratio - 21:9 */
  .image-with-text--wide .image-with-text__media,
  .image-with-text--aspect-wide .image-with-text__image-wrapper {
    padding-bottom: 42.85%; /* 21:9 */
  }

  /* Tall aspect ratio - 2:3 */
  .image-with-text--tall .image-with-text__media,
  .image-with-text--aspect-tall .image-with-text__image-wrapper {
    padding-bottom: 150%; /* 2:3 */
  }

  /* Auto height - image natural size (use with caution) */
  .image-with-text--auto .image-with-text__media {
    padding-bottom: 0;
    height: auto;
  }

  .image-with-text--auto .image-with-text__media img {
    position: static;
    width: 100%;
    height: auto;
  }
}
```

**✅ Checkpoint:** Aspect ratio variations added. Save the file.

---

### Step 6.5: Add Content Alignment & Style Variations

**Location:** Add immediately after aspect ratio variations

**Purpose:** Different text alignments and content styles

**Add this code:**

```css
/* Content Alignment & Style Variations */
@media (max-width: 768px) {
  /* Center-aligned text */
  .image-with-text--center .image-with-text__content,
  .image-with-text--align-center .image-with-text__text-item {
    text-align: center;
  }

  .image-with-text--center .image-with-text__buttons,
  .image-with-text--align-center .image-with-text__buttons {
    align-items: center;
  }

  .image-with-text--center .button--link {
    justify-content: center;
  }

  /* Right-aligned text */
  .image-with-text--right .image-with-text__content,
  .image-with-text--align-right .image-with-text__text-item {
    text-align: right;
  }

  .image-with-text--right .image-with-text__buttons,
  .image-with-text--align-right .image-with-text__buttons {
    align-items: flex-end;
  }

  .image-with-text--right .button--link {
    justify-content: flex-end;
  }

  /* Compact padding - less whitespace */
  .image-with-text--compact .image-with-text__content {
    padding: 1.5rem 1.25rem;
  }

  .image-with-text--compact .image-with-text__heading {
    margin-bottom: 0.75rem;
  }

  .image-with-text--compact .image-with-text__text {
    margin-bottom: 1rem;
  }

  /* Spacious padding - more breathing room */
  .image-with-text--spacious .image-with-text__content {
    padding: 2.5rem 1.5rem;
  }

  .image-with-text--spacious .image-with-text__heading {
    margin-bottom: 1.5rem;
  }

  /* Dark overlay on image with text overlay */
  .image-with-text--overlay .image-with-text__media::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.2) 0%,
      rgba(0, 0, 0, 0.6) 100%
    );
    z-index: 1;
  }

  .image-with-text--overlay .image-with-text__content {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
    z-index: 2;
  }

  .image-with-text--overlay .image-with-text__heading,
  .image-with-text--overlay .image-with-text__text {
    color: white;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
  }

  /* Card style - bordered with background */
  .image-with-text--card {
    margin: 1.25rem;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .image-with-text--card .image-with-text__media {
    border-radius: 0;
  }

  .image-with-text--card .image-with-text__content {
    background: var(--color-background, #fff);
  }

  /* Minimal style - no padding on image */
  .image-with-text--minimal .image-with-text__media {
    margin: 0;
  }

  /* Background color options */
  .image-with-text--bg-light .image-with-text__content {
    background: var(--color-background-secondary, #f9f9f9);
  }

  .image-with-text--bg-dark .image-with-text__content {
    background: var(--color-background-dark, #1a1a1a);
    color: white;
  }

  .image-with-text--bg-dark .image-with-text__heading,
  .image-with-text--bg-dark .image-with-text__text {
    color: white;
  }

  /* Full bleed - no content padding */
  .image-with-text--full-bleed .image-with-text__content {
    padding-left: 0;
    padding-right: 0;
  }
}

@media (max-width: 390px) {
  .image-with-text--spacious .image-with-text__content {
    padding: 2rem 1.25rem;
  }

  .image-with-text--card {
    margin: 1rem;
  }
}
```

**✅ Checkpoint:** Content alignment and style variations added. Save the file.

---

### Step 6.6: Update Image With Text Markup (If Needed)

**This step is OPTIONAL** - Only if markup needs optimization.

**Location:** In your image-with-text file (e.g., `sections/image-with-text.liquid`)

**Before:**
```liquid
<div class="image-with-text">
  <div class="image-with-text__grid">
    <div class="image-with-text__image">
      <img src="{{ section.settings.image | image_url }}" alt="{{ section.settings.image.alt }}">
    </div>
    <div class="image-with-text__content">
      <h2>{{ section.settings.heading }}</h2>
      <p>{{ section.settings.text }}</p>
      <a href="{{ section.settings.button_link }}">{{ section.settings.button_text }}</a>
    </div>
  </div>
</div>
```

**After (optimized for mobile):**
```liquid
<section class="image-with-text image-with-text--{{ section.settings.layout_style }} image-with-text--{{ section.settings.image_ratio }} image-with-text--align-{{ section.settings.text_alignment }}">
  <div class="image-with-text__grid">
    
    {%- comment -%} Image - Always first on mobile {%- endcomment -%}
    <div class="image-with-text__media-item">
      <div class="image-with-text__media">
        {% if section.settings.image %}
          <img 
            src="{{ section.settings.image | image_url: width: 800 }}"
            srcset="{{ section.settings.image | image_url: width: 400 }} 400w,
                    {{ section.settings.image | image_url: width: 800 }} 800w,
                    {{ section.settings.image | image_url: width: 1200 }} 1200w"
            sizes="(max-width: 768px) 100vw, 50vw"
            alt="{{ section.settings.image.alt | escape }}"
            loading="lazy"
            width="800"
            height="600"
            class="image-with-text__image"
          >
        {% else %}
          <div class="image-with-text__placeholder">
            {{ 'lifestyle-1' | placeholder_svg_tag: 'placeholder-svg' }}
          </div>
        {% endif %}
      </div>
    </div>

    {%- comment -%} Text Content {%- endcomment -%}
    <div class="image-with-text__text-item">
      <div class="image-with-text__content">
        
        {% if section.settings.badge != blank %}
          <span class="image-with-text__badge">{{ section.settings.badge }}</span>
        {% endif %}

        {% if section.settings.subheading != blank %}
          <p class="image-with-text__subheading">{{ section.settings.subheading }}</p>
        {% endif %}

        {% if section.settings.heading != blank %}
          <h2 class="image-with-text__heading">{{ section.settings.heading }}</h2>
        {% endif %}

        {% if section.settings.text != blank %}
          <div class="image-with-text__text rte">
            {{ section.settings.text }}
          </div>
        {% endif %}

        {% if section.settings.button_text != blank or section.settings.button_text_2 != blank %}
          <div class="image-with-text__buttons">
            {% if section.settings.button_text != blank %}
              <a 
                href="{{ section.settings.button_link | default: '#' }}" 
                class="image-with-text__button button--primary"
                {% if section.settings.button_link == blank %}aria-disabled="true"{% endif %}
              >
                {{ section.settings.button_text }}
              </a>
            {% endif %}

            {% if section.settings.button_text_2 != blank %}
              <a 
                href="{{ section.settings.button_link_2 | default: '#' }}" 
                class="image-with-text__button button--secondary"
                {% if section.settings.button_link_2 == blank %}aria-disabled="true"{% endif %}
              >
                {{ section.settings.button_text_2 }}
              </a>
            {% endif %}
          </div>
        {% endif %}

      </div>
    </div>

  </div>
</section>
```

**Key improvements:**
- Responsive images with `srcset` and `sizes`
- Lazy loading for performance
- Support for badge/label
- Support for subheading
- Two button options (primary + secondary)
- Dynamic classes for styling variations
- Placeholder for missing images
- Better semantic HTML structure

**✅ Checkpoint:** Image with text markup updated. Save the file.

---

### Step 6.7: Add Section Settings for Customization

**Purpose:** Allow customization through theme editor

**Add to your section schema:**

```liquid
{% schema %}
{
  "name": "Image with Text",
  "settings": [
    {
      "type": "image_picker",
      "id": "image",
      "label": "Image"
    },
    {
      "type": "select",
      "id": "image_ratio",
      "label": "Mobile Image Aspect Ratio",
      "options": [
        {
          "value": "square",
          "label": "Square (1:1)"
        },
        {
          "value": "landscape",
          "label": "Landscape (16:9)"
        },
        {
          "value": "portrait",
          "label": "Portrait (3:4)"
        },
        {
          "value": "wide",
          "label": "Wide (21:9)"
        },
        {
          "value": "auto",
          "label": "Adapt to image"
        }
      ],
      "default": "landscape"
    },
    {
      "type": "text",
      "id": "badge",
      "label": "Badge"
    },
    {
      "type": "text",
      "id": "subheading",
      "label": "Subheading"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Image with text"
    },
    {
      "type": "richtext",
      "id": "text",
      "label": "Description",
      "default": "<p>Pair text with an image to focus on your chosen product, collection, or blog post.</p>"
    },
    {
      "type": "select",
      "id": "text_alignment",
      "label": "Mobile Text Alignment",
      "options": [
        {
          "value": "left",
          "label": "Left"
        },
        {
          "value": "center",
          "label": "Center"
        },
        {
          "value": "right",
          "label": "Right"
        }
      ],
      "default": "left"
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button label"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button link"
    },
    {
      "type": "text",
      "id": "button_text_2",
      "label": "Second button label"
    },
    {
      "type": "url",
      "id": "button_link_2",
      "label": "Second button link"
    },
    {
      "type": "select",
      "id": "layout_style",
      "label": "Mobile Layout Style",
      "options": [
        {
          "value": "default",
          "label": "Default (Image then text)"
        },
        {
          "value": "compact",
          "label": "Compact (Less padding)"
        },
        {
          "value": "spacious",
          "label": "Spacious (More padding)"
        },
        {
          "value": "card",
          "label": "Card (Border & shadow)"
        },
        {
          "value": "overlay",
          "label": "Overlay (Text on image)"
        }
      ],
      "default": "default"
    },
    {
      "type": "select",
      "id": "color_scheme",
      "label": "Color scheme",
      "options": [
        {
          "value": "default",
          "label": "Default"
        },
        {
          "value": "bg-light",
          "label": "Light background"
        },
        {
          "value": "bg-dark",
          "label": "Dark background"
        }
      ],
      "default": "default"
    }
  ],
  "presets": [
    {
      "name": "Image with text"
    }
  ]
}
{% endschema %}
```

**Apply classes dynamically:**
```liquid
<section class="image-with-text 
  image-with-text--{{ section.settings.layout_style }} 
  image-with-text--{{ section.settings.image_ratio }}
  image-with-text--align-{{ section.settings.text_alignment }}
  {% if section.settings.color_scheme != 'default' %}image-with-text--{{ section.settings.color_scheme }}{% endif %}">
```

**✅ Checkpoint:** Section settings configured.

---

### Step 6.8: Test Image With Text on Mobile

**Testing Steps:**

1. **Push changes to development theme:**
   ```bash
   shopify theme push
   ```

2. **Test on multiple screen sizes:**
   - iPhone SE (375px) - Full-width image
   - Standard mobile (390px-768px) - Stacked layout
   - Tablet (768px+) - May show side-by-side

3. **Check image-with-text section specifically:**

   **Visual Tests:**
   - [ ] Image displays first (top of stack)
   - [ ] Image is full-width with proper aspect ratio
   - [ ] Image doesn't distort or stretch
   - [ ] Text content has comfortable padding
   - [ ] Heading is readable and properly sized
   - [ ] Body text has good line height and spacing
   - [ ] Buttons are clearly visible

   **Layout Tests:**
   - [ ] Image and text stack vertically
   - [ ] No horizontal scrolling
   - [ ] Content doesn't feel cramped
   - [ ] Spacing between elements is consistent
   - [ ] Text doesn't overflow
   - [ ] Buttons align properly

   **Interactive Tests:**
   - [ ] Buttons are tappable (min 48px height)
   - [ ] Button text is readable
   - [ ] Links work correctly
   - [ ] No double-tap needed
   - [ ] Active states provide feedback

   **Content Tests:**
   - [ ] All text displays correctly
   - [ ] Images load progressively
   - [ ] Placeholder shows if no image
   - [ ] Badge displays properly (if present)
   - [ ] Subheading displays (if present)
   - [ ] Multiple buttons work (if present)

4. **Test different aspect ratios:**
   - Square (1:1)
   - Landscape (16:9)
   - Portrait (3:4)
   - Wide (21:9)
   - Auto (natural size)

5. **Test style variations:**
   - Default style
   - Compact padding
   - Spacious padding
   - Card style with border
   - Overlay style (text on image)
   - Different text alignments (left, center, right)

6. **Performance check:**
   - [ ] Images lazy load properly
   - [ ] No layout shift when images load
   - [ ] Page loads smoothly
   - [ ] Responsive images load correct size

---

### Step 6.9: Common Image With Text Issues & Fixes

**Issue 1: Image not appearing first on mobile**
```css
@media (max-width: 768px) {
  .image-with-text__media-item {
    order: -1 !important;
  }
  
  .image-with-text__text-item {
    order: 0 !important;
  }
}
```

**Issue 2: Image distorted or stretched**
```css
@media (max-width: 768px) {
  .image-with-text__media {
    padding-bottom: 75% !important;
  }
  
  .image-with-text__media img {
    object-fit: cover !important;
    object-position: center !important;
  }
}
```

**Issue 3: Content not stacking vertically**
```css
@media (max-width: 768px) {
  .image-with-text__grid {
    display: flex !important;
    flex-direction: column !important;
  }
}
```

**Issue 4: Text too close to image**
```css
@media (max-width: 768px) {
  .image-with-text__content {
    padding: 2rem 1.25rem !important;
  }
}
```

**Issue 5: Buttons not full width**
```css
@media (max-width: 768px) {
  .image-with-text__buttons {
    flex-direction: column !important;
  }
  
  .image-with-text__button {
    width: 100% !important;
  }
}
```

**Issue 6: Overlay text not readable**
```css
@media (max-width: 768px) {
  .image-with-text--overlay .image-with-text__media::before {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.8) 100%
    ) !important;
  }
  
  .image-with-text--overlay .image-with-text__heading {
    text-shadow: 0 2px 8px rgba(0, 0, 0, 0.8) !important;
  }
}
```

---

### Step 6.10: Verify Image With Text Accessibility

**Accessibility Checklist:**

- [ ] **Headings**: Use semantic heading tags (h2, h3)
- [ ] **Image alt text**: Descriptive alt text for all images
- [ ] **Color contrast**: Text meets 4.5:1 ratio (including overlay text)
- [ ] **Touch targets**: Buttons min 48px × 48px
- [ ] **Focus states**: Visible focus indicators on buttons/links
- [ ] **Reading order**: Image-first makes logical sense
- [ ] **Link text**: Descriptive button labels (not "click here")
- [ ] **ARIA labels**: Proper labels if needed

**Test with screen reader:**
```html
<!-- Accessible image with text example -->
<section class="image-with-text" aria-labelledby="image-text-heading">
  <div class="image-with-text__media-item">
    <img 
      alt="{{ section.settings.image.alt | default: section.settings.heading | escape }}"
      ...
    >
  </div>
  
  <div class="image-with-text__text-item">
    <h2 id="image-text-heading" class="image-with-text__heading">
      {{ section.settings.heading }}
    </h2>
    
    <div class="image-with-text__text">
      {{ section.settings.text }}
    </div>
    
    <a 
      href="{{ section.settings.button_link }}" 
      class="image-with-text__button"
      aria-label="{{ section.settings.button_text }}: {{ section.settings.heading }}"
    >
      {{ section.settings.button_text }}
    </a>
  </div>
</section>
```

**Check contrast for overlay text:**
```css
/* Ensure overlay text has sufficient contrast */
@media (max-width: 768px) {
  .image-with-text--overlay .image-with-text__heading {
    color: #fff;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.8), 
                 0 0 20px rgba(0, 0, 0, 0.5);
  }
}
```

---

### Step 6.11: Document Image With Text Implementation

**What We Optimized:**

✅ **Image-first stacking** on mobile for visual hierarchy  
✅ **Full-width images** with flexible aspect ratios  
✅ **Comfortable text padding** for readability  
✅ **Full-width buttons** with proper touch targets  
✅ **5 aspect ratio options** (square, landscape, portrait, wide, auto)  
✅ **5 layout styles** (default, compact, spacious, card, overlay)  
✅ **3 text alignments** (left, center, right)  
✅ **Color scheme options** (default, light bg, dark bg)  
✅ **Responsive images** with srcset for performance  
✅ **Badge and subheading** support  
✅ **Two button options** for flexible CTAs  

**Classes Available:**

**Aspect Ratios:**
- `.image-with-text--square` - 1:1 ratio
- `.image-with-text--landscape` - 16:9 ratio (default)
- `.image-with-text--portrait` - 3:4 ratio
- `.image-with-text--wide` - 21:9 ratio
- `.image-with-text--tall` - 2:3 ratio
- `.image-with-text--auto` - Natural image size

**Layout Styles:**
- `.image-with-text--default` - Standard stacking
- `.image-with-text--compact` - Less padding
- `.image-with-text--spacious` - More padding
- `.image-with-text--card` - Border with shadow
- `.image-with-text--overlay` - Text overlaid on image

**Text Alignment:**
- `.image-with-text--center` - Centered text
- `.image-with-text--right` - Right-aligned text
- (Default is left-aligned)

**Color Schemes:**
- `.image-with-text--bg-light` - Light background
- `.image-with-text--bg-dark` - Dark background

**Mobile Breakpoints:**
- `768px` - Image-first vertical stack
- `390px` - Adjusted padding and spacing

---

## ✅ Phase 6 Complete - Image With Text Section Optimized!

**Results:**
- Image displays first on mobile for visual impact
- Full-width images with proper aspect ratios
- Comfortable text padding and readable content
- Full-width touch-friendly buttons
- Multiple layout and style variations
- Optimized for performance and accessibility
- Flexible customization through theme editor

**Before moving to Phase 7:**
1. Test image-with-text on various pages
2. Verify all aspect ratios work correctly
3. Test overlay style with different images
4. Check button functionality
5. Verify text is readable in all styles
6. Test on actual mobile device

---

**Next:** Phase 7 - Rich Text Section Optimization

*Once Phase 6 testing is complete, proceed to Phase 7.*

---

## Phase 7: Rich Text Section Optimization

**Time Estimate:** 30-40 minutes  
**Purpose:** Optimize rich text sections for mobile with better typography, readable line lengths, proper spacing, and enhanced text formatting

**Implementation:** Optimized Reading Experience (Option A)
- Comfortable line length (max-width for readability)
- Enhanced typography scale for mobile
- Better spacing between paragraphs and elements
- Optimized heading hierarchy
- Better link and list styling

---

### Step 7.1: Locate Rich Text Files

**Find rich text section files in your theme:**

Rich text sections might be:
- `sections/rich-text.liquid`
- `sections/text.liquid`
- `sections/custom-text.liquid`
- Or search for text-related section files

**Action:**
```bash
# Search for rich text files
find . -name "*rich*text*.liquid" -o -name "*text*.liquid" | grep sections
```

**Note the files found:** _________________

**Key files to modify:**
- Rich text section file
- Global typography styles (if needed)

---

### Step 7.2: Create Backups

**Before making any changes:**

```bash
# Backup rich text section
cp sections/rich-text.liquid sections/backup_rich-text.liquid

# Backup any other text sections
cp sections/text.liquid sections/backup_text.liquid 2>/dev/null || true
```

**✅ Checkpoint:** Backups created

---

### Step 7.3: Add Rich Text Mobile CSS

**Location:** Add to your global CSS file (after Phase 6 code)

**Purpose:** Mobile-optimized typography and text formatting

**Add this code:**

```css
/* ============================================
   RICH TEXT SECTION MOBILE OPTIMIZATION - Phase 7
   ============================================ */

@media (max-width: 768px) {
  /* Rich text container */
  .rich-text,
  .text-section,
  .custom-text,
  [class*="rich-text"] {
    padding: 2.5rem 1.25rem;
  }

  /* Content wrapper - constrain width for readability */
  .rich-text__wrapper,
  .rich-text__content,
  .text-section__content,
  .rte {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  /* Headings in rich text */
  .rich-text h1,
  .rte h1 {
    font-size: 2rem;
    line-height: 1.2;
    margin-bottom: 1rem;
    margin-top: 2rem;
    font-weight: 700;
  }

  .rich-text h1:first-child,
  .rte h1:first-child {
    margin-top: 0;
  }

  .rich-text h2,
  .rte h2 {
    font-size: 1.75rem;
    line-height: 1.25;
    margin-bottom: 0.875rem;
    margin-top: 1.75rem;
    font-weight: 600;
  }

  .rich-text h2:first-child,
  .rte h2:first-child {
    margin-top: 0;
  }

  .rich-text h3,
  .rte h3 {
    font-size: 1.5rem;
    line-height: 1.3;
    margin-bottom: 0.75rem;
    margin-top: 1.5rem;
    font-weight: 600;
  }

  .rich-text h3:first-child,
  .rte h3:first-child {
    margin-top: 0;
  }

  .rich-text h4,
  .rte h4 {
    font-size: 1.25rem;
    line-height: 1.35;
    margin-bottom: 0.625rem;
    margin-top: 1.25rem;
    font-weight: 600;
  }

  .rich-text h5,
  .rte h5 {
    font-size: 1.125rem;
    line-height: 1.4;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    font-weight: 600;
  }

  .rich-text h6,
  .rte h6 {
    font-size: 1rem;
    line-height: 1.4;
    margin-bottom: 0.5rem;
    margin-top: 1rem;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  /* Paragraphs */
  .rich-text p,
  .rte p {
    font-size: 0.9375rem;
    line-height: 1.7;
    margin-bottom: 1.25rem;
    color: var(--color-text, #333);
  }

  .rich-text p:last-child,
  .rte p:last-child {
    margin-bottom: 0;
  }

  /* Lead paragraph - first paragraph larger */
  .rich-text p:first-of-type,
  .rich-text__lead,
  .rte--lead p:first-of-type {
    font-size: 1.0625rem;
    line-height: 1.65;
    font-weight: 400;
  }

  /* Links */
  .rich-text a,
  .rte a {
    color: var(--color-link, #0066cc);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 2px;
    transition: color 0.2s ease;
  }

  .rich-text a:hover,
  .rich-text a:active {
    color: var(--color-link-hover, #0052a3);
    text-decoration-thickness: 2px;
  }

  /* Bold text */
  .rich-text strong,
  .rich-text b,
  .rte strong,
  .rte b {
    font-weight: 600;
  }

  /* Italic text */
  .rich-text em,
  .rich-text i,
  .rte em,
  .rte i {
    font-style: italic;
  }

  /* Lists */
  .rich-text ul,
  .rich-text ol,
  .rte ul,
  .rte ol {
    margin: 1.25rem 0;
    padding-left: 1.5rem;
  }

  .rich-text ul {
    list-style-type: disc;
  }

  .rich-text ol {
    list-style-type: decimal;
  }

  .rich-text li,
  .rte li {
    font-size: 0.9375rem;
    line-height: 1.7;
    margin-bottom: 0.5rem;
    padding-left: 0.25rem;
  }

  .rich-text li:last-child,
  .rte li:last-child {
    margin-bottom: 0;
  }

  /* Nested lists */
  .rich-text ul ul,
  .rich-text ol ol,
  .rich-text ul ol,
  .rich-text ol ul {
    margin-top: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .rich-text ul ul {
    list-style-type: circle;
  }

  .rich-text ul ul ul {
    list-style-type: square;
  }

  /* Blockquotes */
  .rich-text blockquote,
  .rte blockquote {
    margin: 1.5rem 0;
    padding: 1rem 1.25rem;
    border-left: 4px solid var(--color-accent, #000);
    background: var(--color-background-secondary, #f9f9f9);
    font-style: italic;
  }

  .rich-text blockquote p {
    font-size: 1rem;
    line-height: 1.65;
    margin-bottom: 0.75rem;
  }

  .rich-text blockquote p:last-child {
    margin-bottom: 0;
  }

  .rich-text blockquote cite {
    display: block;
    margin-top: 0.75rem;
    font-size: 0.875rem;
    font-style: normal;
    color: var(--color-text-secondary, #666);
  }

  .rich-text blockquote cite::before {
    content: '— ';
  }

  /* Horizontal rule */
  .rich-text hr,
  .rte hr {
    margin: 2rem 0;
    border: 0;
    border-top: 1px solid var(--color-border, #e5e5e5);
  }

  /* Code */
  .rich-text code,
  .rte code {
    font-family: 'Courier New', Courier, monospace;
    font-size: 0.875rem;
    padding: 0.125rem 0.375rem;
    background: var(--color-background-secondary, #f5f5f5);
    border-radius: 3px;
    color: var(--color-code, #c7254e);
  }

  .rich-text pre,
  .rte pre {
    margin: 1.25rem 0;
    padding: 1rem;
    background: var(--color-background-secondary, #f5f5f5);
    border-radius: 6px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .rich-text pre code {
    padding: 0;
    background: transparent;
    color: inherit;
  }

  /* Tables */
  .rich-text table,
  .rte table {
    width: 100%;
    margin: 1.25rem 0;
    border-collapse: collapse;
    font-size: 0.875rem;
  }

  .rich-text th,
  .rte th {
    padding: 0.75rem;
    text-align: left;
    font-weight: 600;
    background: var(--color-background-secondary, #f5f5f5);
    border-bottom: 2px solid var(--color-border, #ddd);
  }

  .rich-text td,
  .rte td {
    padding: 0.75rem;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  .rich-text tr:last-child td {
    border-bottom: none;
  }

  /* Images in rich text */
  .rich-text img,
  .rte img {
    max-width: 100%;
    height: auto;
    margin: 1.25rem 0;
    border-radius: 8px;
  }

  /* Video embeds */
  .rich-text iframe,
  .rte iframe {
    max-width: 100%;
    margin: 1.25rem 0;
  }

  /* Buttons in rich text */
  .rich-text .button,
  .rte .button {
    display: inline-block;
    min-height: 48px;
    padding: 0.875rem 1.5rem;
    font-size: 0.9375rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}

/* Extra small phones */
@media (max-width: 390px) {
  .rich-text,
  .text-section,
  .custom-text {
    padding: 2rem 1rem;
  }

  .rich-text h1,
  .rte h1 {
    font-size: 1.75rem;
  }

  .rich-text h2,
  .rte h2 {
    font-size: 1.5rem;
  }

  .rich-text h3,
  .rte h3 {
    font-size: 1.25rem;
  }

  .rich-text blockquote,
  .rte blockquote {
    padding: 0.875rem 1rem;
  }

  .rich-text ul,
  .rich-text ol {
    padding-left: 1.25rem;
  }
}
```

**✅ Checkpoint:** Rich text mobile CSS added. Save the file.

---

### Step 7.4: Add Rich Text Layout Variations

**Location:** Add immediately after the rich text CSS

**Purpose:** Different text layout styles for various content needs

**Add this code:**

```css
/* Rich Text Layout Variations */
@media (max-width: 768px) {
  /* Centered text - all content centered */
  .rich-text--center,
  .rich-text--align-center {
    text-align: center;
  }

  .rich-text--center ul,
  .rich-text--center ol {
    text-align: left;
    display: inline-block;
  }

  /* Narrow text - constrained width for better readability */
  .rich-text--narrow .rich-text__wrapper,
  .rich-text--narrow .rich-text__content {
    max-width: 600px;
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  /* Wide text - more breathing room */
  .rich-text--wide .rich-text__wrapper {
    max-width: 100%;
  }

  /* Compact spacing - tighter vertical rhythm */
  .rich-text--compact p {
    margin-bottom: 0.875rem;
  }

  .rich-text--compact h2 {
    margin-top: 1.25rem;
    margin-bottom: 0.625rem;
  }

  .rich-text--compact h3 {
    margin-top: 1rem;
    margin-bottom: 0.5rem;
  }

  .rich-text--compact ul,
  .rich-text--compact ol {
    margin: 0.875rem 0;
  }

  /* Spacious - more breathing room */
  .rich-text--spacious p {
    margin-bottom: 1.75rem;
  }

  .rich-text--spacious h2 {
    margin-top: 2.5rem;
    margin-bottom: 1.25rem;
  }

  .rich-text--spacious h3 {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .rich-text--spacious ul,
  .rich-text--spacious ol {
    margin: 1.75rem 0;
  }

  .rich-text--spacious li {
    margin-bottom: 0.75rem;
  }

  /* Large text - bigger font sizes */
  .rich-text--large p,
  .rich-text--large li {
    font-size: 1.0625rem;
    line-height: 1.7;
  }

  .rich-text--large h2 {
    font-size: 2rem;
  }

  .rich-text--large h3 {
    font-size: 1.75rem;
  }

  /* Small text - smaller font sizes */
  .rich-text--small p,
  .rich-text--small li {
    font-size: 0.875rem;
    line-height: 1.65;
  }

  .rich-text--small h2 {
    font-size: 1.5rem;
  }

  .rich-text--small h3 {
    font-size: 1.25rem;
  }

  /* Highlighted style - background color */
  .rich-text--highlighted {
    background: var(--color-background-secondary, #f9f9f9);
    padding: 2rem 1.25rem;
    border-radius: 8px;
  }

  /* Bordered style */
  .rich-text--bordered {
    border: 1px solid var(--color-border, #e5e5e5);
    padding: 2rem 1.25rem;
    border-radius: 8px;
  }

  /* Drop cap - large first letter */
  .rich-text--drop-cap p:first-of-type::first-letter {
    float: left;
    font-size: 3.5rem;
    line-height: 0.85;
    margin: 0.1em 0.15em 0 0;
    font-weight: 700;
    color: var(--color-accent, #000);
  }

  /* Columns - two column layout for lists */
  .rich-text--columns ul,
  .rich-text--columns ol {
    column-count: 1; /* Single column on mobile */
    column-gap: 1.5rem;
  }

  .rich-text--columns li {
    break-inside: avoid;
  }
}

@media (max-width: 390px) {
  .rich-text--narrow .rich-text__wrapper,
  .rich-text--narrow .rich-text__content {
    padding-left: 1rem;
    padding-right: 1rem;
  }

  .rich-text--highlighted,
  .rich-text--bordered {
    padding: 1.5rem 1rem;
  }

  .rich-text--drop-cap p:first-of-type::first-letter {
    font-size: 3rem;
  }
}
```

**✅ Checkpoint:** Rich text variations added. Save the file.

---

### Step 7.5: Add Special Typography Elements

**Location:** Add immediately after variations

**Purpose:** Enhanced typography features for better text presentation

**Add this code:**

```css
/* Special Typography Elements */
@media (max-width: 768px) {
  /* Subheadings / Kickers */
  .rich-text__kicker,
  .rich-text__subheading {
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 600;
    color: var(--color-accent, #666);
    margin-bottom: 0.5rem;
  }

  /* Lead text / Introduction */
  .rich-text__intro,
  .rich-text__lead {
    font-size: 1.125rem;
    line-height: 1.65;
    margin-bottom: 1.5rem;
    font-weight: 400;
    color: var(--color-text-secondary, #555);
  }

  /* Highlighted text */
  .rich-text mark,
  .rte mark {
    background: var(--color-highlight, #fff3cd);
    padding: 0.125rem 0.25rem;
    border-radius: 2px;
  }

  /* Small text / Fine print */
  .rich-text small,
  .rte small,
  .rich-text__caption {
    font-size: 0.8125rem;
    line-height: 1.5;
    color: var(--color-text-secondary, #666);
    display: block;
    margin-top: 0.5rem;
  }

  /* Pull quote */
  .rich-text__pullquote,
  .pullquote {
    font-size: 1.25rem;
    line-height: 1.5;
    font-weight: 500;
    font-style: italic;
    margin: 2rem 0;
    padding: 1.25rem;
    border-left: 4px solid var(--color-accent, #000);
    background: var(--color-background-secondary, #f9f9f9);
  }

  /* Divider with text */
  .rich-text__divider {
    display: flex;
    align-items: center;
    text-align: center;
    margin: 2rem 0;
    font-size: 0.875rem;
    color: var(--color-text-secondary, #666);
  }

  .rich-text__divider::before,
  .rich-text__divider::after {
    content: '';
    flex: 1;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
  }

  .rich-text__divider::before {
    margin-right: 1rem;
  }

  .rich-text__divider::after {
    margin-left: 1rem;
  }

  /* Callout box */
  .rich-text__callout,
  .callout {
    padding: 1.25rem;
    margin: 1.5rem 0;
    background: var(--color-background-secondary, #f0f8ff);
    border-left: 4px solid var(--color-accent, #0066cc);
    border-radius: 4px;
  }

  .rich-text__callout p:last-child {
    margin-bottom: 0;
  }

  /* Info box with icon */
  .rich-text__info,
  .info-box {
    position: relative;
    padding: 1.25rem 1.25rem 1.25rem 3rem;
    margin: 1.5rem 0;
    background: var(--color-info-bg, #e7f3ff);
    border-radius: 6px;
  }

  .rich-text__info::before,
  .info-box::before {
    content: 'ℹ';
    position: absolute;
    left: 1rem;
    top: 1.25rem;
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-info, #0066cc);
  }

  /* Warning box */
  .rich-text__warning,
  .warning-box {
    position: relative;
    padding: 1.25rem 1.25rem 1.25rem 3rem;
    margin: 1.5rem 0;
    background: var(--color-warning-bg, #fff3cd);
    border-left: 4px solid var(--color-warning, #ffc107);
    border-radius: 6px;
  }

  .rich-text__warning::before,
  .warning-box::before {
    content: '⚠';
    position: absolute;
    left: 1rem;
    top: 1.25rem;
    font-size: 1.25rem;
  }

  /* Success box */
  .rich-text__success,
  .success-box {
    position: relative;
    padding: 1.25rem 1.25rem 1.25rem 3rem;
    margin: 1.5rem 0;
    background: var(--color-success-bg, #d4edda);
    border-left: 4px solid var(--color-success, #28a745);
    border-radius: 6px;
  }

  .rich-text__success::before,
  .success-box::before {
    content: '✓';
    position: absolute;
    left: 1rem;
    top: 1.25rem;
    font-size: 1.25rem;
    font-weight: 700;
    color: var(--color-success, #28a745);
  }

  /* Stat / Number highlight */
  .rich-text__stat {
    text-align: center;
    margin: 2rem 0;
  }

  .rich-text__stat-number {
    display: block;
    font-size: 3rem;
    font-weight: 700;
    line-height: 1;
    color: var(--color-accent, #000);
    margin-bottom: 0.5rem;
  }

  .rich-text__stat-label {
    display: block;
    font-size: 0.875rem;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: var(--color-text-secondary, #666);
  }
}

@media (max-width: 390px) {
  .rich-text__pullquote,
  .pullquote {
    font-size: 1.125rem;
    padding: 1rem;
  }

  .rich-text__stat-number {
    font-size: 2.5rem;
  }

  .rich-text__info,
  .rich-text__warning,
  .rich-text__success {
    padding: 1rem 1rem 1rem 2.5rem;
  }

  .rich-text__info::before,
  .rich-text__warning::before,
  .rich-text__success::before {
    left: 0.75rem;
    font-size: 1.125rem;
  }
}
```

**✅ Checkpoint:** Special typography elements added. Save the file.

---

### Step 7.6: Update Rich Text Markup (If Needed)

**This step is OPTIONAL** - Only if markup needs optimization.

**Location:** In your rich text file (e.g., `sections/rich-text.liquid`)

**Before:**
```liquid
<div class="rich-text">
  <div class="rich-text__content rte">
    {{ section.settings.text }}
  </div>
</div>
```

**After (optimized for mobile):**
```liquid
<section class="rich-text rich-text--{{ section.settings.layout_style }} rich-text--{{ section.settings.text_size }}">
  <div class="rich-text__wrapper page-width">
    
    {% if section.settings.kicker != blank %}
      <p class="rich-text__kicker">{{ section.settings.kicker }}</p>
    {% endif %}

    {% if section.settings.heading != blank %}
      <h2 class="rich-text__heading">{{ section.settings.heading }}</h2>
    {% endif %}

    {% if section.settings.subheading != blank %}
      <p class="rich-text__intro">{{ section.settings.subheading }}</p>
    {% endif %}

    {% if section.settings.text != blank %}
      <div class="rich-text__content rte">
        {{ section.settings.text }}
      </div>
    {% endif %}

    {% if section.settings.button_text != blank %}
      <div class="rich-text__buttons">
        <a 
          href="{{ section.settings.button_link | default: '#' }}" 
          class="button button--primary"
        >
          {{ section.settings.button_text }}
        </a>
      </div>
    {% endif %}

  </div>
</section>
```

**Key improvements:**
- Optional kicker/label above heading
- Optional intro/lead text
- Button support
- Dynamic class application for styles
- Better semantic structure

**✅ Checkpoint:** Rich text markup updated. Save the file.

---

### Step 7.7: Add Section Settings for Customization

**Purpose:** Allow customization through theme editor

**Add to your section schema:**

```liquid
{% schema %}
{
  "name": "Rich Text",
  "settings": [
    {
      "type": "text",
      "id": "kicker",
      "label": "Kicker / Label",
      "info": "Small text above the heading"
    },
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Rich text"
    },
    {
      "type": "richtext",
      "id": "subheading",
      "label": "Introduction / Lead text",
      "info": "Larger text below the heading"
    },
    {
      "type": "richtext",
      "id": "text",
      "label": "Text",
      "default": "<p>Use this section to add text, images, lists, and more.</p>"
    },
    {
      "type": "select",
      "id": "layout_style",
      "label": "Mobile Layout Style",
      "options": [
        {
          "value": "default",
          "label": "Default"
        },
        {
          "value": "narrow",
          "label": "Narrow (Constrained width)"
        },
        {
          "value": "compact",
          "label": "Compact (Tight spacing)"
        },
        {
          "value": "spacious",
          "label": "Spacious (Loose spacing)"
        },
        {
          "value": "highlighted",
          "label": "Highlighted (Background)"
        },
        {
          "value": "bordered",
          "label": "Bordered"
        },
        {
          "value": "drop-cap",
          "label": "Drop cap (Large first letter)"
        }
      ],
      "default": "default"
    },
    {
      "type": "select",
      "id": "text_size",
      "label": "Mobile Text Size",
      "options": [
        {
          "value": "small",
          "label": "Small"
        },
        {
          "value": "default",
          "label": "Default"
        },
        {
          "value": "large",
          "label": "Large"
        }
      ],
      "default": "default"
    },
    {
      "type": "select",
      "id": "text_alignment",
      "label": "Text alignment",
      "options": [
        {
          "value": "left",
          "label": "Left"
        },
        {
          "value": "center",
          "label": "Center"
        }
      ],
      "default": "left"
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button label"
    },
    {
      "type": "url",
      "id": "button_link",
      "label": "Button link"
    }
  ],
  "presets": [
    {
      "name": "Rich Text"
    }
  ]
}
{% endschema %}
```

**Apply classes dynamically:**
```liquid
<section class="rich-text 
  rich-text--{{ section.settings.layout_style }}
  {% if section.settings.text_size != 'default' %}rich-text--{{ section.settings.text_size }}{% endif %}
  {% if section.settings.text_alignment == 'center' %}rich-text--center{% endif %}">
```

**✅ Checkpoint:** Section settings configured.

---

### Step 7.8: Test Rich Text on Mobile

**Testing Steps:**

1. **Push changes to development theme:**
   ```bash
   shopify theme push
   ```

2. **Test on multiple screen sizes:**
   - iPhone SE (375px) - Compact view
   - Standard mobile (390px-768px) - Standard view
   - Tablet (768px+) - May show wider text

3. **Check rich text section specifically:**

   **Visual Tests:**
   - [ ] Text is readable with good line height
   - [ ] Headings have proper hierarchy
   - [ ] Paragraphs have comfortable spacing
   - [ ] Lists are properly formatted
   - [ ] Links are clearly visible and styled
   - [ ] Blockquotes stand out visually

   **Typography Tests:**
   - [ ] Font sizes are appropriate for mobile
   - [ ] Line length is comfortable (not too wide)
   - [ ] Heading sizes scale properly
   - [ ] Text color has good contrast
   - [ ] Bold and italic text render correctly

   **Element Tests:**
   - [ ] Tables are readable (if present)
   - [ ] Code blocks format correctly
   - [ ] Images scale properly
   - [ ] Horizontal rules display
   - [ ] Nested lists work correctly

   **Interactive Tests:**
   - [ ] Links are tappable (good touch targets)
   - [ ] No horizontal scrolling on code/tables
   - [ ] Images don't overflow container

4. **Test content variations:**
   - Short text (1-2 paragraphs)
   - Long text (10+ paragraphs)
   - Text with multiple headings
   - Text with lists and links
   - Text with blockquotes
   - Text with special elements (callouts, warnings)

5. **Test layout variations:**
   - Default style
   - Narrow layout
   - Compact spacing
   - Spacious spacing
   - Highlighted background
   - Bordered style
   - Drop cap style

6. **Performance check:**
   - [ ] Text renders quickly
   - [ ] No layout shift
   - [ ] Smooth scrolling

---

### Step 7.9: Common Rich Text Issues & Fixes

**Issue 1: Text too wide, hard to read**
```css
@media (max-width: 768px) {
  .rich-text__wrapper,
  .rich-text__content {
    max-width: 100% !important;
    padding-left: 1.25rem !important;
    padding-right: 1.25rem !important;
  }
}
```

**Issue 2: Headings too large on mobile**
```css
@media (max-width: 768px) {
  .rich-text h1 { font-size: 1.75rem !important; }
  .rich-text h2 { font-size: 1.5rem !important; }
  .rich-text h3 { font-size: 1.25rem !important; }
}
```

**Issue 3: Line height too tight**
```css
@media (max-width: 768px) {
  .rich-text p,
  .rte p {
    line-height: 1.7 !important;
  }
}
```

**Issue 4: Lists indented too much**
```css
@media (max-width: 768px) {
  .rich-text ul,
  .rich-text ol {
    padding-left: 1.25rem !important;
  }
}
```

**Issue 5: Tables overflow container**
```css
@media (max-width: 768px) {
  .rich-text table {
    display: block;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
```

**Issue 6: Links not visible enough**
```css
@media (max-width: 768px) {
  .rich-text a,
  .rte a {
    color: var(--color-link, #0066cc) !important;
    text-decoration: underline !important;
    text-decoration-thickness: 2px !important;
  }
}
```

---

### Step 7.10: Verify Rich Text Accessibility

**Accessibility Checklist:**

- [ ] **Heading hierarchy**: Proper h1-h6 structure (no skipping levels)
- [ ] **Color contrast**: Text meets 4.5:1 ratio (3:1 for large text)
- [ ] **Link contrast**: Links distinguishable from text
- [ ] **Focus states**: Visible focus on links
- [ ] **Semantic HTML**: Proper use of p, ul, ol, blockquote tags
- [ ] **Alt text**: Images have descriptive alt text
- [ ] **Tables**: Proper th/td structure with headers
- [ ] **Lists**: Proper ul/ol/li structure

**Test with screen reader:**
```html
<!-- Accessible rich text structure -->
<section class="rich-text" aria-labelledby="rich-text-heading">
  <div class="rich-text__wrapper">
    <h2 id="rich-text-heading">{{ section.settings.heading }}</h2>
    
    <div class="rich-text__content rte">
      <p>First paragraph with <a href="#">accessible link text</a>.</p>
      
      <h3>Subheading follows proper hierarchy</h3>
      
      <ul aria-label="Feature list">
        <li>List item with clear content</li>
        <li>Another clear list item</li>
      </ul>
      
      <blockquote cite="https://example.com">
        <p>Quotation text</p>
        <cite>Author Name</cite>
      </blockquote>
    </div>
  </div>
</section>
```

**Check contrast:**
```css
/* Ensure sufficient contrast */
@media (max-width: 768px) {
  .rich-text {
    color: #333; /* Meets 4.5:1 on white */
  }
  
  .rich-text a {
    color: #0066cc; /* Meets 4.5:1 on white */
  }
}
```

---

### Step 7.11: Document Rich Text Implementation

**What We Optimized:**

✅ **Enhanced typography** with proper mobile font sizes  
✅ **Comfortable line length** with max-width constraint  
✅ **Improved spacing** between paragraphs and elements  
✅ **Proper heading hierarchy** with mobile-optimized sizes  
✅ **Better list styling** with appropriate indentation  
✅ **Enhanced blockquotes** with visual distinction  
✅ **Readable tables** with horizontal scroll if needed  
✅ **Code formatting** with proper wrapping  
✅ **7 layout variations** for different content needs  
✅ **Special elements** (callouts, warnings, stats, pull quotes)  
✅ **3 text size options** (small, default, large)  

**Classes Available:**

**Layout Styles:**
- `.rich-text--default` - Standard layout
- `.rich-text--narrow` - Constrained width for better readability
- `.rich-text--compact` - Tighter vertical spacing
- `.rich-text--spacious` - Looser vertical spacing
- `.rich-text--highlighted` - Background color
- `.rich-text--bordered` - Border with rounded corners
- `.rich-text--drop-cap` - Large first letter
- `.rich-text--center` - Center-aligned text

**Text Sizes:**
- `.rich-text--small` - Smaller font sizes
- `.rich-text--large` - Larger font sizes
- (Default is standard size)

**Special Elements:**
- `.rich-text__kicker` - Small label above heading
- `.rich-text__intro` - Lead paragraph style
- `.rich-text__pullquote` - Large pull quote
- `.rich-text__callout` - Info callout box
- `.rich-text__info` - Info box with icon
- `.rich-text__warning` - Warning box
- `.rich-text__success` - Success box
- `.rich-text__stat` - Number/stat display
- `.rich-text__divider` - Text divider

**Mobile Breakpoints:**
- `768px` - Mobile typography styles
- `390px` - Adjusted font sizes and spacing

**Typography Scale:**
- Body text: 15px (0.9375rem)
- Lead text: 17px (1.0625rem)
- H6: 16px
- H5: 18px
- H4: 20px
- H3: 24px
- H2: 28px
- H1: 32px

---

## ✅ Phase 7 Complete - Rich Text Section Optimized!

**Results:**
- Readable typography optimized for mobile screens
- Comfortable line length and spacing
- Proper heading hierarchy with mobile-friendly sizes
- Enhanced styling for lists, quotes, and special elements
- Multiple layout variations for different content types
- Special typography elements (callouts, stats, pull quotes)
- Accessible and properly structured content
- Customizable through theme editor

**Before moving to Phase 8:**
1. Test rich text on various pages
2. Verify all text elements render correctly
3. Check heading hierarchy
4. Test special elements (callouts, quotes)
5. Verify links are tappable and visible
6. Test on actual mobile device

---

**Next:** Phase 8 - Video Section Optimization

*Once Phase 7 testing is complete, proceed to Phase 8.*

---

## Phase 8: Video Section Optimization

**Time Estimate:** 35-45 minutes  
**Purpose:** Optimize video sections for mobile with responsive 16:9 aspect ratio, lazy loading, touch-friendly play buttons, and proper controls

**Implementation:** Responsive Video with Lazy Loading (Option A)
- 16:9 aspect ratio container
- Lazy loading for performance
- Large touch-friendly play button
- YouTube and Vimeo support
- Native HTML5 video support
- Optional cover image before play

---

### Step 8.1: Locate Video Section Files

**Find video section files in your theme:**

Video sections might be:
- `sections/video.liquid`
- `sections/video-hero.liquid`
- `sections/featured-video.liquid`
- Or search for video-related files

**Action:**
```bash
# Search for video files
find . -name "*video*.liquid" | grep sections
```

**Note the files found:** _________________

**Key files to modify:**
- Video section file
- Any video-related snippets

---

### Step 8.2: Create Backups

**Before making any changes:**

```bash
# Backup video section
cp sections/video.liquid sections/backup_video.liquid

# Backup video hero if exists
cp sections/video-hero.liquid sections/backup_video-hero.liquid 2>/dev/null || true

# Backup featured video if exists
cp sections/featured-video.liquid sections/backup_featured-video.liquid 2>/dev/null || true
```

**✅ Checkpoint:** Backups created

---

### Step 8.3: Add Video Mobile CSS

**Location:** Add to your global CSS file (after Phase 7 code)

**Purpose:** Mobile-optimized video display with responsive aspect ratio

**Add this code:**

```css
/* ============================================
   VIDEO SECTION MOBILE OPTIMIZATION - Phase 8
   ============================================ */

@media (max-width: 768px) {
  /* Video section container */
  .video-section,
  .featured-video,
  .video-hero,
  [class*="video-section"] {
    padding: 2.5rem 1.25rem;
  }

  /* Video section heading */
  .video-section__heading,
  .featured-video__heading {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  /* Video section description */
  .video-section__description,
  .featured-video__description {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    text-align: center;
    max-width: 100%;
  }

  /* Video wrapper - maintains aspect ratio */
  .video-section__media,
  .video-section__wrapper,
  .video-wrapper,
  .media-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    overflow: hidden;
    background: #000;
    border-radius: 8px;
  }

  /* Video iframe (YouTube, Vimeo) */
  .video-section__media iframe,
  .video-wrapper iframe,
  .media-wrapper iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  /* Native HTML5 video */
  .video-section__media video,
  .video-wrapper video {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* Video cover image (before play) */
  .video-section__poster,
  .video-section__cover,
  .video-cover {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    z-index: 1;
    transition: opacity 0.3s ease;
  }

  .video-section__poster.hidden,
  .video-cover.hidden {
    opacity: 0;
    pointer-events: none;
  }

  /* Play button overlay */
  .video-section__play-button,
  .video-play-button,
  .deferred-media__poster-button {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 72px;
    height: 72px;
    min-height: 72px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 50%;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 2;
    transition: all 0.2s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  .video-section__play-button:hover,
  .video-section__play-button:focus {
    background: rgba(255, 255, 255, 1);
    transform: translate(-50%, -50%) scale(1.05);
  }

  .video-section__play-button:active {
    transform: translate(-50%, -50%) scale(0.98);
  }

  /* Play icon */
  .video-section__play-button svg,
  .video-play-button svg {
    width: 28px;
    height: 28px;
    fill: var(--color-text, #000);
    margin-left: 4px; /* Slight offset for visual centering */
  }

  /* Loading state */
  .video-section__loading,
  .video-loading {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  .video-section__loading::after {
    content: '';
    display: block;
    width: 40px;
    height: 40px;
    border: 3px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: video-spinner 0.8s linear infinite;
  }

  @keyframes video-spinner {
    to { transform: rotate(360deg); }
  }

  /* Video controls overlay (custom controls) */
  .video-section__controls {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 100%);
    opacity: 0;
    transition: opacity 0.2s ease;
    z-index: 2;
  }

  .video-section__media:hover .video-section__controls,
  .video-wrapper:hover .video-section__controls {
    opacity: 1;
  }

  /* Video caption/description below video */
  .video-section__caption,
  .video-caption {
    margin-top: 1rem;
    font-size: 0.875rem;
    line-height: 1.5;
    color: var(--color-text-secondary, #666);
    text-align: center;
  }

  /* Video metadata (duration, views, etc.) */
  .video-section__meta,
  .video-meta {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-top: 0.75rem;
    font-size: 0.8125rem;
    color: var(--color-text-secondary, #666);
  }

  /* Video with text content below */
  .video-section__content {
    margin-top: 1.5rem;
    padding: 0;
  }

  .video-section__content h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
  }

  .video-section__content p {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin-bottom: 1rem;
  }

  /* Multiple videos in grid */
  .video-section__grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 1.5rem;
    margin-top: 1.5rem;
  }

  /* Video card in grid */
  .video-card {
    display: flex;
    flex-direction: column;
  }

  .video-card__thumbnail {
    position: relative;
    width: 100%;
    padding-bottom: 56.25%; /* 16:9 */
    overflow: hidden;
    border-radius: 8px;
    margin-bottom: 0.75rem;
  }

  .video-card__thumbnail img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .video-card__title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }

  .video-card__duration {
    position: absolute;
    bottom: 0.5rem;
    right: 0.5rem;
    padding: 0.25rem 0.5rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    font-size: 0.75rem;
    border-radius: 4px;
    z-index: 1;
  }
}

/* Extra small phones */
@media (max-width: 390px) {
  .video-section,
  .featured-video {
    padding: 2rem 1rem;
  }

  .video-section__heading {
    font-size: 1.5rem;
  }

  .video-section__play-button {
    width: 64px;
    height: 64px;
    min-height: 64px;
  }

  .video-section__play-button svg {
    width: 24px;
    height: 24px;
  }

  .video-section__grid {
    gap: 1rem;
  }
}
```

**✅ Checkpoint:** Video mobile CSS added. Save the file.

---

### Step 8.4: Add Video Aspect Ratio Variations

**Location:** Add immediately after the video CSS

**Purpose:** Different video aspect ratios for various content types

**Add this code:**

```css
/* Video Aspect Ratio Variations */
@media (max-width: 768px) {
  /* Square video - 1:1 */
  .video-section--square .video-section__media,
  .video-wrapper--square {
    padding-bottom: 100%;
  }

  /* Vertical video - 9:16 (TikTok, Reels, Stories) */
  .video-section--vertical .video-section__media,
  .video-wrapper--vertical {
    max-width: 400px;
    margin-left: auto;
    margin-right: auto;
    padding-bottom: 177.78%; /* 9:16 */
  }

  /* Ultra-wide video - 21:9 */
  .video-section--ultrawide .video-section__media,
  .video-wrapper--ultrawide {
    padding-bottom: 42.85%; /* 21:9 */
  }

  /* 4:3 classic video */
  .video-section--classic .video-section__media,
  .video-wrapper--classic {
    padding-bottom: 75%; /* 4:3 */
  }

  /* Full width (no border radius) */
  .video-section--full-width .video-section__media,
  .video-wrapper--full-width {
    border-radius: 0;
    margin-left: -1.25rem;
    margin-right: -1.25rem;
    width: calc(100% + 2.5rem);
  }

  /* Auto height - video natural size */
  .video-section--auto .video-section__media {
    padding-bottom: 0;
    height: auto;
  }

  .video-section--auto video {
    position: static;
    width: 100%;
    height: auto;
  }
}

@media (max-width: 390px) {
  .video-section--vertical .video-section__media {
    max-width: 100%;
  }

  .video-section--full-width .video-section__media {
    margin-left: -1rem;
    margin-right: -1rem;
    width: calc(100% + 2rem);
  }
}
```

**✅ Checkpoint:** Video aspect ratio variations added. Save the file.

---

### Step 8.5: Add Video Style Variations

**Location:** Add immediately after aspect ratio variations

**Purpose:** Different video presentation styles

**Add this code:**

```css
/* Video Style Variations */
@media (max-width: 768px) {
  /* Hero video - full height viewport */
  .video-section--hero {
    padding: 0;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  .video-section--hero .video-section__media {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    padding-bottom: 0;
    border-radius: 0;
  }

  .video-section--hero .video-section__content {
    position: relative;
    z-index: 3;
    color: white;
    text-align: center;
    padding: 2rem 1.25rem;
  }

  .video-section--hero::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2;
  }

  /* Background video (autoplay, no controls) */
  .video-section--background .video-section__media video {
    object-fit: cover;
  }

  .video-section--background .video-section__play-button {
    display: none;
  }

  /* Contained video - max width with shadow */
  .video-section--contained .video-section__media {
    max-width: 640px;
    margin-left: auto;
    margin-right: auto;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }

  /* Inline video - smaller, fits in content flow */
  .video-section--inline {
    padding: 1.5rem 1.25rem;
  }

  .video-section--inline .video-section__media {
    max-width: 480px;
    margin-left: auto;
    margin-right: auto;
  }

  /* Video with border */
  .video-section--bordered .video-section__media {
    border: 2px solid var(--color-border, #e5e5e5);
  }

  /* Video grid - 2 videos side by side on larger mobile */
  .video-section--grid .video-section__grid {
    grid-template-columns: 1fr;
  }

  /* Compact video list */
  .video-section--list .video-section__grid {
    gap: 1rem;
  }

  .video-section--list .video-card {
    flex-direction: row;
    align-items: flex-start;
  }

  .video-section--list .video-card__thumbnail {
    width: 120px;
    padding-bottom: 0;
    height: 68px; /* 16:9 of 120px */
    flex-shrink: 0;
    margin-bottom: 0;
    margin-right: 0.75rem;
  }

  .video-section--list .video-card__info {
    flex: 1;
  }

  .video-section--list .video-card__title {
    font-size: 0.9375rem;
  }
}

@media (max-width: 390px) {
  .video-section--hero {
    min-height: 70vh;
  }

  .video-section--inline .video-section__media {
    max-width: 100%;
  }

  .video-section--contained .video-section__media {
    max-width: 100%;
  }

  .video-section--list .video-card__thumbnail {
    width: 100px;
    height: 56px;
  }
}
```

**✅ Checkpoint:** Video style variations added. Save the file.

---

### Step 8.6: Update Video Section Markup (If Needed)

**This step is OPTIONAL** - Only if markup needs optimization.

**Location:** In your video file (e.g., `sections/video.liquid`)

**Before:**
```liquid
<div class="video-section">
  <iframe src="{{ section.settings.video_url }}"></iframe>
</div>
```

**After (optimized for mobile with lazy loading):**
```liquid
<section class="video-section video-section--{{ section.settings.aspect_ratio }} video-section--{{ section.settings.style }}">
  <div class="video-section__wrapper page-width">
    
    {% if section.settings.heading != blank %}
      <h2 class="video-section__heading">{{ section.settings.heading }}</h2>
    {% endif %}

    {% if section.settings.description != blank %}
      <div class="video-section__description rte">
        {{ section.settings.description }}
      </div>
    {% endif %}

    <div class="video-section__media-wrapper">
      <div class="video-section__media" id="video-{{ section.id }}">
        
        {%- comment -%} Cover image before video loads {%- endcomment -%}
        {% if section.settings.cover_image %}
          <img 
            src="{{ section.settings.cover_image | image_url: width: 800 }}"
            srcset="{{ section.settings.cover_image | image_url: width: 400 }} 400w,
                    {{ section.settings.cover_image | image_url: width: 800 }} 800w,
                    {{ section.settings.cover_image | image_url: width: 1200 }} 1200w"
            sizes="(max-width: 768px) 100vw, 800px"
            alt="{{ section.settings.heading | escape }}"
            class="video-section__poster"
            loading="lazy"
          >
        {% endif %}

        {%- comment -%} Play button {%- endcomment -%}
        <button 
          class="video-section__play-button"
          aria-label="Play video: {{ section.settings.heading | escape }}"
          data-video-id="{{ section.id }}"
        >
          <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 5v14l11-7z" fill="currentColor"/>
          </svg>
        </button>

        {%- comment -%} Video placeholder - will be replaced with iframe on play {%- endcomment -%}
        <div 
          class="video-section__placeholder"
          data-video-type="{{ section.settings.video_type }}"
          data-video-id="{{ section.settings.video_url | split: '/' | last }}"
        ></div>

      </div>

      {% if section.settings.caption != blank %}
        <p class="video-section__caption">{{ section.settings.caption }}</p>
      {% endif %}
    </div>

  </div>
</section>

<script>
  // Lazy load video on play button click
  document.addEventListener('DOMContentLoaded', function() {
    const playButtons = document.querySelectorAll('.video-section__play-button');
    
    playButtons.forEach(button => {
      button.addEventListener('click', function() {
        const videoId = this.dataset.videoId;
        const videoContainer = document.getElementById('video-' + videoId);
        const placeholder = videoContainer.querySelector('.video-section__placeholder');
        const videoType = placeholder.dataset.videoType;
        const videoIdString = placeholder.dataset.videoId;
        
        let iframeSrc = '';
        
        if (videoType === 'youtube') {
          iframeSrc = `https://www.youtube.com/embed/${videoIdString}?autoplay=1&rel=0`;
        } else if (videoType === 'vimeo') {
          iframeSrc = `https://player.vimeo.com/video/${videoIdString}?autoplay=1`;
        }
        
        if (iframeSrc) {
          const iframe = document.createElement('iframe');
          iframe.src = iframeSrc;
          iframe.allow = 'autoplay; fullscreen; picture-in-picture';
          iframe.allowFullscreen = true;
          
          placeholder.replaceWith(iframe);
          
          // Hide poster and play button
          const poster = videoContainer.querySelector('.video-section__poster');
          if (poster) poster.classList.add('hidden');
          this.style.display = 'none';
        }
      });
    });
  });
</script>
```

**Key improvements:**
- Lazy loading - video only loads when play button clicked
- Cover image with responsive srcset
- YouTube and Vimeo support
- Accessible play button with ARIA label
- Prevents autoplay (saves data)
- Better performance on mobile

**✅ Checkpoint:** Video markup updated. Save the file.

---

### Step 8.7: Add Native HTML5 Video Support

**Purpose:** Support for self-hosted video files

**Add this markup variation for native video:**

```liquid
{%- comment -%} Native HTML5 Video {%- endcomment -%}
{% if section.settings.video_file %}
  <div class="video-section__media">
    <video 
      class="video-section__video"
      controls
      playsinline
      preload="metadata"
      {% if section.settings.cover_image %}poster="{{ section.settings.cover_image | image_url: width: 800 }}"{% endif %}
    >
      <source src="{{ section.settings.video_file }}" type="video/mp4">
      <p>Your browser doesn't support HTML5 video. <a href="{{ section.settings.video_file }}">Download the video</a>.</p>
    </video>
  </div>
{% endif %}
```

**Add CSS for native video controls:**

```css
@media (max-width: 768px) {
  /* Native video controls styling */
  .video-section__video {
    width: 100%;
    height: 100%;
  }

  .video-section__video::-webkit-media-controls-panel {
    background: rgba(0, 0, 0, 0.8);
  }

  /* Ensure controls are touch-friendly */
  .video-section__video::-webkit-media-controls-play-button,
  .video-section__video::-webkit-media-controls-fullscreen-button {
    min-width: 44px;
    min-height: 44px;
  }
}
```

**✅ Checkpoint:** Native video support added.

---

### Step 8.8: Add Section Settings for Customization

**Purpose:** Allow customization through theme editor

**Add to your section schema:**

```liquid
{% schema %}
{
  "name": "Video",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Video"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Description"
    },
    {
      "type": "select",
      "id": "video_type",
      "label": "Video source",
      "options": [
        {
          "value": "youtube",
          "label": "YouTube"
        },
        {
          "value": "vimeo",
          "label": "Vimeo"
        },
        {
          "value": "html5",
          "label": "Self-hosted (HTML5)"
        }
      ],
      "default": "youtube"
    },
    {
      "type": "text",
      "id": "video_url",
      "label": "Video URL",
      "info": "Full YouTube or Vimeo URL"
    },
    {
      "type": "image_picker",
      "id": "cover_image",
      "label": "Cover image",
      "info": "Displays before video plays"
    },
    {
      "type": "select",
      "id": "aspect_ratio",
      "label": "Mobile Aspect Ratio",
      "options": [
        {
          "value": "default",
          "label": "16:9 (Landscape)"
        },
        {
          "value": "square",
          "label": "1:1 (Square)"
        },
        {
          "value": "vertical",
          "label": "9:16 (Vertical)"
        },
        {
          "value": "classic",
          "label": "4:3 (Classic)"
        },
        {
          "value": "ultrawide",
          "label": "21:9 (Ultra-wide)"
        }
      ],
      "default": "default"
    },
    {
      "type": "select",
      "id": "style",
      "label": "Mobile Style",
      "options": [
        {
          "value": "default",
          "label": "Default"
        },
        {
          "value": "contained",
          "label": "Contained (Max-width with shadow)"
        },
        {
          "value": "full-width",
          "label": "Full-width (No padding)"
        },
        {
          "value": "inline",
          "label": "Inline (Smaller)"
        },
        {
          "value": "bordered",
          "label": "Bordered"
        },
        {
          "value": "hero",
          "label": "Hero (Full viewport height)"
        }
      ],
      "default": "default"
    },
    {
      "type": "text",
      "id": "caption",
      "label": "Video caption"
    }
  ],
  "presets": [
    {
      "name": "Video"
    }
  ]
}
{% endschema %}
```

**Apply classes dynamically:**
```liquid
<section class="video-section 
  video-section--{{ section.settings.aspect_ratio }}
  video-section--{{ section.settings.style }}">
```

**✅ Checkpoint:** Section settings configured.

---

### Step 8.9: Test Video Section on Mobile

**Testing Steps:**

1. **Push changes to development theme:**
   ```bash
   shopify theme push
   ```

2. **Test on multiple screen sizes:**
   - iPhone SE (375px) - Compact view
   - Standard mobile (390px-768px) - Standard view
   - Test in portrait and landscape orientations

3. **Check video section specifically:**

   **Visual Tests:**
   - [ ] Video maintains proper aspect ratio
   - [ ] Cover image displays before play
   - [ ] Play button is centered and visible
   - [ ] Video fills container properly
   - [ ] No black bars or distortion
   - [ ] Border radius applies correctly

   **Layout Tests:**
   - [ ] Video doesn't overflow container
   - [ ] Heading and description display correctly
   - [ ] Caption displays below video
   - [ ] Spacing is comfortable
   - [ ] No horizontal scrolling

   **Interactive Tests:**
   - [ ] Play button is tappable (72px × 72px)
   - [ ] Video loads when play button clicked
   - [ ] Video autoplays after loading
   - [ ] Video controls work properly
   - [ ] Fullscreen button works
   - [ ] Video pauses/resumes correctly

   **Performance Tests:**
   - [ ] Video doesn't load until play clicked (lazy loading)
   - [ ] Cover image loads quickly
   - [ ] Page doesn't slow down with video
   - [ ] Video loads smoothly
   - [ ] No excessive data usage

4. **Test different video sources:**
   - YouTube videos
   - Vimeo videos
   - Self-hosted videos (if applicable)
   - Different video lengths

5. **Test aspect ratios:**
   - 16:9 (default landscape)
   - 1:1 (square)
   - 9:16 (vertical - TikTok style)
   - 4:3 (classic)
   - 21:9 (ultra-wide)

6. **Test style variations:**
   - Default
   - Contained
   - Full-width
   - Inline
   - Bordered
   - Hero (full viewport)

7. **Test edge cases:**
   - Video without cover image
   - Video without heading
   - Very long video titles
   - Multiple videos on same page

---

### Step 8.10: Common Video Issues & Fixes

**Issue 1: Video not maintaining aspect ratio**
```css
@media (max-width: 768px) {
  .video-section__media {
    position: relative !important;
    padding-bottom: 56.25% !important; /* 16:9 */
  }
  
  .video-section__media iframe,
  .video-section__media video {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
  }
}
```

**Issue 2: Play button too small to tap**
```css
@media (max-width: 768px) {
  .video-section__play-button {
    width: 72px !important;
    height: 72px !important;
    min-height: 72px !important;
  }
}
```

**Issue 3: Video loading immediately (not lazy)**
```javascript
// Ensure video only loads on click
button.addEventListener('click', function() {
  // Create iframe only when clicked
  const iframe = document.createElement('iframe');
  iframe.src = videoUrl + '?autoplay=1';
  container.appendChild(iframe);
});
```

**Issue 4: Cover image not showing**
```css
@media (max-width: 768px) {
  .video-section__poster {
    position: absolute !important;
    top: 0 !important;
    left: 0 !important;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    z-index: 1 !important;
  }
}
```

**Issue 5: Video controls too small**
```css
@media (max-width: 768px) {
  video::-webkit-media-controls-play-button {
    min-width: 48px !important;
    min-height: 48px !important;
  }
}
```

**Issue 6: YouTube video not autoplayingafter load**
```javascript
// Add autoplay parameter to URL
const iframeSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;
```

---

### Step 8.11: Verify Video Accessibility

**Accessibility Checklist:**

- [ ] **Play button**: Has descriptive ARIA label
- [ ] **Video title**: Proper heading hierarchy
- [ ] **Captions**: Video has closed captions (if applicable)
- [ ] **Keyboard control**: Play button keyboard accessible
- [ ] **Focus states**: Visible focus indicator
- [ ] **Transcript**: Link to transcript (for important content)
- [ ] **Autoplay**: No autoplay with sound (data/accessibility concern)
- [ ] **Controls**: Native controls are accessible

**Test with screen reader:**
```html
<!-- Accessible video example -->
<section class="video-section" aria-labelledby="video-heading">
  <h2 id="video-heading">{{ section.settings.heading }}</h2>
  
  <div class="video-section__media" role="region" aria-label="Video player">
    <button 
      class="video-section__play-button"
      aria-label="Play video: {{ section.settings.heading | escape }}"
      type="button"
    >
      <svg aria-hidden="true">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </button>
  </div>
  
  {% if section.settings.transcript_url %}
    <p class="video-section__transcript">
      <a href="{{ section.settings.transcript_url }}">
        Read transcript
      </a>
    </p>
  {% endif %}
</section>
```

**Ensure keyboard navigation:**
```javascript
// Make play button keyboard accessible
playButton.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    this.click();
  }
});
```

---

### Step 8.12: Document Video Implementation

**What We Optimized:**

✅ **16:9 responsive aspect ratio** for standard videos  
✅ **Lazy loading** - video only loads when play clicked  
✅ **Touch-friendly play button** (72px × 72px)  
✅ **Cover image support** with responsive srcset  
✅ **YouTube and Vimeo** integration  
✅ **Native HTML5 video** support  
✅ **5 aspect ratio options** (16:9, 1:1, 9:16, 4:3, 21:9)  
✅ **6 style variations** (default, contained, full-width, inline, bordered, hero)  
✅ **Custom play button** with accessible label  
✅ **Video captions** and metadata support  
✅ **Performance optimized** with lazy loading  

**Classes Available:**

**Aspect Ratios:**
- `.video-section--default` - 16:9 landscape
- `.video-section--square` - 1:1 square
- `.video-section--vertical` - 9:16 vertical (TikTok/Reels)
- `.video-section--classic` - 4:3 classic
- `.video-section--ultrawide` - 21:9 ultra-wide

**Styles:**
- `.video-section--default` - Standard presentation
- `.video-section--contained` - Max-width with shadow
- `.video-section--full-width` - Edge-to-edge video
- `.video-section--inline` - Smaller, inline video
- `.video-section--bordered` - Video with border
- `.video-section--hero` - Full viewport height
- `.video-section--background` - Background video (autoplay)

**Mobile Breakpoints:**
- `768px` - Mobile video styles
- `390px` - Adjusted play button and spacing

**Performance Features:**
- Lazy loading (video loads on play)
- Cover image preloads
- Responsive images with srcset
- No autoplay (saves data)

---

## ✅ Phase 8 Complete - Video Section Optimized!

**Results:**
- Videos maintain proper aspect ratio on mobile
- Lazy loading improves page performance
- Touch-friendly play button (72px × 72px)
- Cover images display before video loads
- Multiple aspect ratios for different content
- Various style options for different needs
- YouTube, Vimeo, and HTML5 video support
- Accessible and keyboard navigable
- Optimized for mobile data usage

**Before moving to Phase 9:**
1. Test video on various pages
2. Verify lazy loading works
3. Test play button responsiveness
4. Check aspect ratios display correctly
5. Verify video controls are accessible
6. Test on actual mobile device with limited data

---

**Next:** Phase 9 - FAQ Section Optimization

*Once Phase 8 testing is complete, proceed to Phase 9.*

---

## Phase 9: FAQ Section Optimization

**Time Estimate:** 35-45 minutes  
**Purpose:** Optimize FAQ/accordion sections for mobile with full-width touch targets, clear expand/collapse indicators, readable content, and smooth animations

**Implementation:** Full-Width Accordions (Option A)
- Full-width accordion items
- Large touch targets (min 48px height)
- Clear expand/collapse icons
- Smooth animations
- One or multiple items open at once
- Easy-to-read question and answer formatting

---

### Step 9.1: Locate FAQ Section Files

**Find FAQ/accordion section files in your theme:**

FAQ sections might be:
- `sections/faq.liquid`
- `sections/accordion.liquid`
- `sections/collapsible-content.liquid`
- Or search for related files

**Action:**
```bash
# Search for FAQ and accordion files
find . -name "*faq*.liquid" -o -name "*accordion*.liquid" -o -name "*collapsible*.liquid" | grep sections
```

**Note the files found:** _________________

**Key files to modify:**
- FAQ section file
- Any accordion-related snippets

---

### Step 9.2: Create Backups

**Before making any changes:**

```bash
# Backup FAQ section
cp sections/faq.liquid sections/backup_faq.liquid

# Backup accordion if exists
cp sections/accordion.liquid sections/backup_accordion.liquid 2>/dev/null || true

# Backup collapsible content if exists
cp sections/collapsible-content.liquid sections/backup_collapsible-content.liquid 2>/dev/null || true
```

**✅ Checkpoint:** Backups created

---

### Step 9.3: Add FAQ Mobile CSS

**Location:** Add to your global CSS file (after Phase 8 code)

**Purpose:** Mobile-optimized accordion/FAQ styling

**Add this code:**

```css
/* ============================================
   FAQ SECTION MOBILE OPTIMIZATION - Phase 9
   ============================================ */

@media (max-width: 768px) {
  /* FAQ section container */
  .faq-section,
  .accordion-section,
  .collapsible-content,
  [class*="faq"] {
    padding: 2.5rem 1.25rem;
  }

  /* FAQ section heading */
  .faq-section__heading,
  .accordion-section__heading {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }

  /* FAQ section description */
  .faq-section__description {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--color-text-secondary, #666);
  }

  /* FAQ items container */
  .faq-section__items,
  .accordion__items,
  .collapsible-content__items {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* Individual FAQ item */
  .faq-item,
  .accordion-item,
  .collapsible-item,
  details.faq {
    background: var(--color-background, #fff);
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 8px;
    overflow: hidden;
    transition: all 0.2s ease;
  }

  .faq-item.active,
  .accordion-item.active,
  details.faq[open] {
    border-color: var(--color-accent, #000);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  /* FAQ question/summary - full-width touch target */
  .faq-item__question,
  .accordion-item__header,
  .collapsible-item__heading,
  details.faq summary {
    width: 100%;
    min-height: 56px;
    padding: 1rem 3rem 1rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: pointer;
    user-select: none;
    position: relative;
    background: transparent;
    border: none;
    text-align: left;
    font-size: 1rem;
    font-weight: 600;
    line-height: 1.4;
    color: var(--color-text, #000);
    transition: background-color 0.2s ease;
    -webkit-tap-highlight-color: transparent;
  }

  .faq-item__question:hover,
  .faq-item__question:focus,
  summary:hover {
    background: var(--color-background-secondary, #f9f9f9);
  }

  .faq-item__question:active,
  summary:active {
    background: var(--color-background-secondary, #f0f0f0);
  }

  /* Remove default summary marker */
  summary {
    list-style: none;
  }

  summary::-webkit-details-marker {
    display: none;
  }

  summary::marker {
    display: none;
  }

  /* Question text */
  .faq-item__question-text,
  .accordion-item__title {
    flex: 1;
    padding-right: 0.5rem;
  }

  /* Expand/collapse icon */
  .faq-item__icon,
  .accordion-item__icon,
  .collapsible-icon {
    position: absolute;
    right: 1.25rem;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  .faq-item.active .faq-item__icon,
  .accordion-item.active .accordion-item__icon,
  details[open] .collapsible-icon {
    transform: translateY(-50%) rotate(180deg);
  }

  /* Icon SVG */
  .faq-item__icon svg,
  .accordion-item__icon svg,
  .collapsible-icon svg {
    width: 100%;
    height: 100%;
    fill: var(--color-text, #000);
  }

  /* Plus/minus icon alternative */
  .faq-item__icon--plus {
    width: 18px;
    height: 18px;
  }

  .faq-item.active .faq-item__icon--plus::before {
    transform: rotate(90deg);
  }

  /* FAQ answer/content */
  .faq-item__answer,
  .accordion-item__content,
  .collapsible-item__content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 0.3s ease, padding 0.3s ease;
  }

  .faq-item.active .faq-item__answer,
  .accordion-item.active .accordion-item__content,
  details[open] .collapsible-item__content {
    max-height: 2000px; /* Large enough for most content */
    padding: 0 1.25rem 1.25rem;
  }

  /* Answer text */
  .faq-item__answer-text,
  .accordion-item__body {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: var(--color-text-secondary, #333);
  }

  .faq-item__answer-text p,
  .accordion-item__body p {
    margin-bottom: 1rem;
  }

  .faq-item__answer-text p:last-child,
  .accordion-item__body p:last-child {
    margin-bottom: 0;
  }

  /* Lists in answers */
  .faq-item__answer-text ul,
  .faq-item__answer-text ol {
    margin: 0.75rem 0;
    padding-left: 1.5rem;
  }

  .faq-item__answer-text li {
    margin-bottom: 0.5rem;
  }

  /* Links in answers */
  .faq-item__answer-text a {
    color: var(--color-link, #0066cc);
    text-decoration: underline;
  }

  /* Category headings (if FAQs are grouped) */
  .faq-category,
  .accordion-category {
    margin-top: 2rem;
    margin-bottom: 1rem;
  }

  .faq-category:first-child,
  .accordion-category:first-child {
    margin-top: 0;
  }

  .faq-category__heading,
  .accordion-category__heading {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 1rem;
  }

  /* Search box for FAQs */
  .faq-section__search {
    margin-bottom: 1.5rem;
  }

  .faq-section__search-input {
    width: 100%;
    min-height: 48px;
    padding: 0.75rem 1rem;
    font-size: 0.9375rem;
    border: 1px solid var(--color-border, #ddd);
    border-radius: 8px;
    background: var(--color-background, #fff);
  }

  .faq-section__search-input:focus {
    outline: none;
    border-color: var(--color-accent, #000);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  /* No results message */
  .faq-section__no-results {
    text-align: center;
    padding: 2rem 1rem;
    color: var(--color-text-secondary, #666);
    font-size: 0.9375rem;
  }

  /* FAQ counter/indicator */
  .faq-item__number {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    margin-right: 0.75rem;
    background: var(--color-background-secondary, #f0f0f0);
    border-radius: 50%;
    font-size: 0.75rem;
    font-weight: 600;
    flex-shrink: 0;
  }

  .faq-item.active .faq-item__number {
    background: var(--color-accent, #000);
    color: white;
  }
}

/* Extra small phones */
@media (max-width: 390px) {
  .faq-section,
  .accordion-section {
    padding: 2rem 1rem;
  }

  .faq-section__heading {
    font-size: 1.5rem;
  }

  .faq-item__question,
  summary {
    padding: 0.875rem 2.75rem 0.875rem 1rem;
    min-height: 52px;
    font-size: 0.9375rem;
  }

  .faq-item__icon {
    right: 1rem;
  }

  .faq-item.active .faq-item__answer,
  details[open] .collapsible-item__content {
    padding: 0 1rem 1rem;
  }
}
```

**✅ Checkpoint:** FAQ mobile CSS added. Save the file.

---

### Step 9.4: Add FAQ Style Variations

**Location:** Add immediately after the FAQ CSS

**Purpose:** Different FAQ/accordion presentation styles

**Add this code:**

```css
/* FAQ Style Variations */
@media (max-width: 768px) {
  /* Minimal style - no borders, simple dividers */
  .faq-section--minimal .faq-item {
    border: none;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
    border-radius: 0;
    background: transparent;
  }

  .faq-section--minimal .faq-item:last-child {
    border-bottom: none;
  }

  /* Card style - more spacing, shadows */
  .faq-section--cards .faq-section__items {
    gap: 1rem;
  }

  .faq-section--cards .faq-item {
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    border: none;
  }

  .faq-section--cards .faq-item.active {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }

  /* Compact style - tighter spacing */
  .faq-section--compact .faq-section__items {
    gap: 0.5rem;
  }

  .faq-section--compact .faq-item__question {
    min-height: 48px;
    padding: 0.75rem 2.75rem 0.75rem 1rem;
    font-size: 0.9375rem;
  }

  .faq-section--compact .faq-item.active .faq-item__answer {
    padding: 0 1rem 1rem;
  }

  /* Spacious style - more breathing room */
  .faq-section--spacious .faq-section__items {
    gap: 1.25rem;
  }

  .faq-section--spacious .faq-item__question {
    min-height: 64px;
    padding: 1.25rem 3.5rem 1.25rem 1.5rem;
  }

  .faq-section--spacious .faq-item.active .faq-item__answer {
    padding: 0 1.5rem 1.5rem;
  }

  /* Highlighted style - background color when open */
  .faq-section--highlighted .faq-item.active {
    background: var(--color-background-secondary, #f9f9f9);
  }

  /* Numbered style - with question numbers */
  .faq-section--numbered .faq-item__question {
    padding-left: 3.5rem;
  }

  .faq-section--numbered .faq-item__number {
    position: absolute;
    left: 1rem;
  }

  /* Two-column on wider mobile (not recommended < 768px) */
  .faq-section--columns .faq-section__items {
    display: grid;
    grid-template-columns: 1fr; /* Keep single column on mobile */
    gap: 0.75rem;
  }

  /* Bold questions */
  .faq-section--bold .faq-item__question {
    font-weight: 700;
  }

  /* Large text */
  .faq-section--large .faq-item__question {
    font-size: 1.0625rem;
  }

  .faq-section--large .faq-item__answer-text {
    font-size: 1rem;
  }

  /* Small text */
  .faq-section--small .faq-item__question {
    font-size: 0.875rem;
  }

  .faq-section--small .faq-item__answer-text {
    font-size: 0.8125rem;
  }
}

@media (max-width: 390px) {
  .faq-section--spacious .faq-item__question {
    min-height: 60px;
    padding: 1rem 3rem 1rem 1.25rem;
  }

  .faq-section--numbered .faq-item__question {
    padding-left: 3rem;
  }

  .faq-section--numbered .faq-item__number {
    left: 0.875rem;
  }
}
```

**✅ Checkpoint:** FAQ style variations added. Save the file.

---

### Step 9.5: Add FAQ JavaScript Functionality

**Purpose:** Make accordions interactive with smooth animations

**Add this JavaScript (can be inline in section or in separate file):**

```javascript
/* FAQ Accordion Functionality */
document.addEventListener('DOMContentLoaded', function() {
  
  // Get all FAQ items (non-details elements)
  const faqItems = document.querySelectorAll('.faq-item__question, .accordion-item__header');
  
  faqItems.forEach(function(question) {
    question.addEventListener('click', function() {
      const faqItem = this.closest('.faq-item, .accordion-item');
      const answer = faqItem.querySelector('.faq-item__answer, .accordion-item__content');
      const allItems = document.querySelectorAll('.faq-item, .accordion-item');
      
      // Check if this item is currently active
      const isActive = faqItem.classList.contains('active');
      
      // Optional: Close other items (accordion behavior)
      // Remove this section if you want multiple items open at once
      const singleOpen = faqItem.closest('.faq-section, .accordion-section')?.dataset?.singleOpen === 'true';
      if (singleOpen && !isActive) {
        allItems.forEach(function(item) {
          if (item !== faqItem) {
            item.classList.remove('active');
            const otherAnswer = item.querySelector('.faq-item__answer, .accordion-item__content');
            if (otherAnswer) {
              otherAnswer.style.maxHeight = '0px';
            }
          }
        });
      }
      
      // Toggle current item
      if (isActive) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0px';
      } else {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
  
  // FAQ search functionality
  const searchInput = document.querySelector('.faq-section__search-input');
  if (searchInput) {
    searchInput.addEventListener('input', function() {
      const searchTerm = this.value.toLowerCase();
      const faqItems = document.querySelectorAll('.faq-item, .accordion-item');
      let visibleCount = 0;
      
      faqItems.forEach(function(item) {
        const question = item.querySelector('.faq-item__question-text, .accordion-item__title')?.textContent.toLowerCase() || '';
        const answer = item.querySelector('.faq-item__answer-text, .accordion-item__body')?.textContent.toLowerCase() || '';
        
        if (question.includes(searchTerm) || answer.includes(searchTerm)) {
          item.style.display = '';
          visibleCount++;
        } else {
          item.style.display = 'none';
        }
      });
      
      // Show/hide no results message
      const noResults = document.querySelector('.faq-section__no-results');
      if (noResults) {
        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
      }
    });
  }
  
});
```

**✅ Checkpoint:** FAQ JavaScript added.

---

### Step 9.6: Update FAQ Section Markup (If Needed)

**This step is OPTIONAL** - Only if markup needs optimization.

**Location:** In your FAQ file (e.g., `sections/faq.liquid`)

**Option 1: Using <details> element (native HTML):**
```liquid
<section class="faq-section faq-section--{{ section.settings.style }}">
  <div class="faq-section__wrapper page-width">
    
    {% if section.settings.heading != blank %}
      <h2 class="faq-section__heading">{{ section.settings.heading }}</h2>
    {% endif %}

    {% if section.settings.description != blank %}
      <div class="faq-section__description rte">
        {{ section.settings.description }}
      </div>
    {% endif %}

    {% if section.settings.enable_search %}
      <div class="faq-section__search">
        <input 
          type="text" 
          class="faq-section__search-input"
          placeholder="Search FAQs..."
          aria-label="Search FAQs"
        >
      </div>
      <div class="faq-section__no-results" style="display: none;">
        No results found. Try different keywords.
      </div>
    {% endif %}

    <div class="faq-section__items">
      {% for block in section.blocks %}
        <details class="faq faq-item">
          <summary class="faq-item__question">
            {% if section.settings.show_numbers %}
              <span class="faq-item__number">{{ forloop.index }}</span>
            {% endif %}
            <span class="faq-item__question-text">{{ block.settings.question }}</span>
            <span class="faq-item__icon collapsible-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </summary>
          <div class="faq-item__answer collapsible-item__content">
            <div class="faq-item__answer-text rte">
              {{ block.settings.answer }}
            </div>
          </div>
        </details>
      {% endfor %}
    </div>

  </div>
</section>
```

**Option 2: Using custom accordion (more control):**
```liquid
<section class="faq-section faq-section--{{ section.settings.style }}" data-single-open="{{ section.settings.single_open }}">
  <div class="faq-section__wrapper page-width">
    
    {% if section.settings.heading != blank %}
      <h2 class="faq-section__heading">{{ section.settings.heading }}</h2>
    {% endif %}

    <div class="faq-section__items">
      {% for block in section.blocks %}
        <div class="faq-item" data-index="{{ forloop.index }}">
          <button 
            class="faq-item__question"
            type="button"
            aria-expanded="false"
            aria-controls="faq-answer-{{ section.id }}-{{ forloop.index }}"
          >
            {% if section.settings.show_numbers %}
              <span class="faq-item__number">{{ forloop.index }}</span>
            {% endif %}
            <span class="faq-item__question-text">{{ block.settings.question }}</span>
            <span class="faq-item__icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 10l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </span>
          </button>
          <div 
            class="faq-item__answer"
            id="faq-answer-{{ section.id }}-{{ forloop.index }}"
            role="region"
            aria-labelledby="faq-question-{{ section.id }}-{{ forloop.index }}"
          >
            <div class="faq-item__answer-text rte">
              {{ block.settings.answer }}
            </div>
          </div>
        </div>
      {% endfor %}
    </div>

  </div>
</section>
```

**Key improvements:**
- Accessible with proper ARIA attributes
- Keyboard navigable
- Search functionality (optional)
- Question numbers (optional)
- Single or multiple open behavior
- Semantic HTML

**✅ Checkpoint:** FAQ markup updated. Save the file.

---

### Step 9.7: Add Section Settings for Customization

**Purpose:** Allow customization through theme editor

**Add to your section schema:**

```liquid
{% schema %}
{
  "name": "FAQ",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Frequently Asked Questions"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Description"
    },
    {
      "type": "select",
      "id": "style",
      "label": "Mobile Style",
      "options": [
        {
          "value": "default",
          "label": "Default (Bordered)"
        },
        {
          "value": "minimal",
          "label": "Minimal (Dividers only)"
        },
        {
          "value": "cards",
          "label": "Cards (Shadow)"
        },
        {
          "value": "compact",
          "label": "Compact (Less spacing)"
        },
        {
          "value": "spacious",
          "label": "Spacious (More spacing)"
        },
        {
          "value": "highlighted",
          "label": "Highlighted (Background when open)"
        }
      ],
      "default": "default"
    },
    {
      "type": "checkbox",
      "id": "single_open",
      "label": "Only allow one FAQ open at a time",
      "default": true
    },
    {
      "type": "checkbox",
      "id": "show_numbers",
      "label": "Show question numbers",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "enable_search",
      "label": "Enable search",
      "default": false
    }
  ],
  "blocks": [
    {
      "type": "faq_item",
      "name": "FAQ Item",
      "settings": [
        {
          "type": "text",
          "id": "question",
          "label": "Question",
          "default": "Question"
        },
        {
          "type": "richtext",
          "id": "answer",
          "label": "Answer",
          "default": "<p>Answer to the question.</p>"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "FAQ",
      "blocks": [
        {
          "type": "faq_item",
          "settings": {
            "question": "How long does shipping take?",
            "answer": "<p>Shipping typically takes 3-5 business days within the continental US.</p>"
          }
        },
        {
          "type": "faq_item",
          "settings": {
            "question": "What is your return policy?",
            "answer": "<p>We offer a 30-day return policy on all items in original condition.</p>"
          }
        },
        {
          "type": "faq_item",
          "settings": {
            "question": "Do you ship internationally?",
            "answer": "<p>Yes, we ship to most countries worldwide. Shipping times vary by location.</p>"
          }
        }
      ]
    }
  ]
}
{% endschema %}
```

**Apply classes dynamically:**
```liquid
<section class="faq-section 
  faq-section--{{ section.settings.style }}
  {% if section.settings.show_numbers %}faq-section--numbered{% endif %}">
```

**✅ Checkpoint:** Section settings configured.

---

### Step 9.8: Test FAQ Section on Mobile

**Testing Steps:**

1. **Push changes to development theme:**
   ```bash
   shopify theme push
   ```

2. **Test on multiple screen sizes:**
   - iPhone SE (375px) - Compact view
   - Standard mobile (390px-768px) - Standard view
   - Tablet (768px+) - May show two columns

3. **Check FAQ section specifically:**

   **Visual Tests:**
   - [ ] FAQ items display full-width
   - [ ] Questions are clearly readable
   - [ ] Expand/collapse icons are visible
   - [ ] Borders/dividers display correctly
   - [ ] Active state is visually distinct
   - [ ] Animations are smooth

   **Layout Tests:**
   - [ ] Touch targets are min 48px height
   - [ ] Text doesn't overflow
   - [ ] Icon aligns properly
   - [ ] Spacing between items is comfortable
   - [ ] Answer text has good line height
   - [ ] No horizontal scrolling

   **Interactive Tests:**
   - [ ] Questions are tappable
   - [ ] Tap expands/collapses answer
   - [ ] Icon rotates when expanded
   - [ ] Animation is smooth (no janky motion)
   - [ ] Only one opens at a time (if enabled)
   - [ ] Multiple can open (if enabled)
   - [ ] No double-tap required

   **Content Tests:**
   - [ ] Question text displays fully
   - [ ] Answer text is readable
   - [ ] Links in answers work
   - [ ] Lists in answers format correctly
   - [ ] Long answers display properly
   - [ ] Search filters FAQs (if enabled)

4. **Test different FAQ counts:**
   - 3-5 FAQs (typical)
   - 10+ FAQs (long list)
   - Single FAQ

5. **Test style variations:**
   - Default (bordered)
   - Minimal (dividers)
   - Cards (shadow)
   - Compact spacing
   - Spacious spacing
   - Highlighted (background when open)

6. **Test behaviors:**
   - Single open mode
   - Multiple open mode
   - With search enabled
   - With question numbers
   - With categories (if implemented)

7. **Performance check:**
   - [ ] Animations are smooth (60fps)
   - [ ] No layout shift
   - [ ] Page loads quickly
   - [ ] Scrolling is smooth

---

### Step 9.9: Common FAQ Issues & Fixes

**Issue 1: Accordion not opening/closing**
```javascript
// Ensure JavaScript is loaded and working
const question = document.querySelector('.faq-item__question');
question.addEventListener('click', function() {
  this.closest('.faq-item').classList.toggle('active');
});
```

**Issue 2: Touch target too small**
```css
@media (max-width: 768px) {
  .faq-item__question {
    min-height: 56px !important;
    padding: 1rem !important;
  }
}
```

**Issue 3: Animation janky or stuttering**
```css
@media (max-width: 768px) {
  .faq-item__answer {
    transition: max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
  }
}
```

**Issue 4: Icon not rotating**
```css
@media (max-width: 768px) {
  .faq-item.active .faq-item__icon {
    transform: translateY(-50%) rotate(180deg) !important;
  }
}
```

**Issue 5: Answer text cut off**
```css
@media (max-width: 768px) {
  .faq-item.active .faq-item__answer {
    max-height: 3000px !important; /* Increase if needed */
  }
}
```

**Issue 6: Multiple items opening when single mode enabled**
```javascript
// Close all other items first
allItems.forEach(item => {
  if (item !== currentItem) {
    item.classList.remove('active');
  }
});
```

---

### Step 9.10: Verify FAQ Accessibility

**Accessibility Checklist:**

- [ ] **Keyboard navigation**: Tab through all questions
- [ ] **Enter/Space**: Opens/closes accordion
- [ ] **ARIA attributes**: aria-expanded, aria-controls, role
- [ ] **Focus states**: Visible focus indicators
- [ ] **Heading hierarchy**: Proper h2/h3 structure
- [ ] **Screen reader**: Announces state changes
- [ ] **Touch targets**: Min 48px × 48px
- [ ] **Color contrast**: Text meets 4.5:1 ratio

**Test with screen reader:**
```html
<!-- Accessible FAQ example -->
<section class="faq-section" aria-labelledby="faq-heading">
  <h2 id="faq-heading">{{ section.settings.heading }}</h2>
  
  <div class="faq-section__items">
    <div class="faq-item">
      <button 
        class="faq-item__question"
        type="button"
        aria-expanded="false"
        aria-controls="faq-answer-1"
        id="faq-question-1"
      >
        <span class="faq-item__question-text">{{ block.settings.question }}</span>
        <span class="faq-item__icon" aria-hidden="true">
          <svg>...</svg>
        </span>
      </button>
      <div 
        class="faq-item__answer"
        id="faq-answer-1"
        role="region"
        aria-labelledby="faq-question-1"
      >
        <div class="faq-item__answer-text">
          {{ block.settings.answer }}
        </div>
      </div>
    </div>
  </div>
</section>
```

**Update aria-expanded on click:**
```javascript
question.addEventListener('click', function() {
  const isExpanded = this.getAttribute('aria-expanded') === 'true';
  this.setAttribute('aria-expanded', !isExpanded);
});
```

---

### Step 9.11: Document FAQ Implementation

**What We Optimized:**

✅ **Full-width accordions** optimized for mobile tapping  
✅ **Large touch targets** (min 56px height)  
✅ **Clear expand/collapse icons** with rotation animation  
✅ **Smooth animations** for opening/closing  
✅ **Single or multiple open** behavior options  
✅ **Search functionality** to filter FAQs  
✅ **Question numbers** (optional)  
✅ **6 style variations** for different designs  
✅ **Accessible markup** with ARIA attributes  
✅ **Keyboard navigable** with proper focus states  
✅ **Category support** for grouped FAQs  

**Classes Available:**

**Styles:**
- `.faq-section--default` - Bordered cards
- `.faq-section--minimal` - Simple dividers
- `.faq-section--cards` - Shadow cards
- `.faq-section--compact` - Tighter spacing
- `.faq-section--spacious` - More breathing room
- `.faq-section--highlighted` - Background when open
- `.faq-section--numbered` - Question numbers
- `.faq-section--bold` - Bold question text
- `.faq-section--large` - Larger text
- `.faq-section--small` - Smaller text

**Mobile Breakpoints:**
- `768px` - Mobile accordion styles
- `390px` - Adjusted padding and spacing

**Features:**
- Smooth CSS animations (0.3s ease)
- JavaScript toggle functionality
- Search/filter capability
- Single or multiple open modes
- Question numbering
- Category grouping

**Behavior Options:**
- `data-single-open="true"` - Only one open at a time
- `data-single-open="false"` - Multiple can be open

---

## ✅ Phase 9 Complete - FAQ Section Optimized!

**Results:**
- Full-width accordions optimized for mobile
- Large, easy-to-tap touch targets (56px height)
- Clear visual feedback with icons and animations
- Smooth, performant animations
- Flexible behavior (single or multiple open)
- Search functionality to find answers quickly
- Multiple style variations for different needs
- Fully accessible with keyboard navigation
- Screen reader friendly with proper ARIA

**Before moving to Phase 10:**
1. Test FAQ section on various pages
2. Verify accordion animations are smooth
3. Test touch targets work properly
4. Check single/multiple open modes
5. Verify search functionality (if enabled)
6. Test on actual mobile device
7. Test with keyboard navigation
8. Test with screen reader

---

**Next:** Phase 10 - Newsletter Section Optimization

*Once Phase 9 testing is complete, proceed to Phase 10.*

---

## Phase 10: Newsletter Section Optimization

**Time Estimate:** 30-40 minutes  
**Purpose:** Optimize newsletter signup sections for mobile with stacked form layout, full-width inputs, large submit button, and proper validation feedback

**Implementation:** Stacked Form Layout (Option A)
- Full-width email input field
- Large submit button (min 48px height)
- Clear placeholder and labels
- Inline validation feedback
- Privacy policy/consent text
- Success/error message display
- Touch-friendly form controls

---

### Step 10.1: Locate Newsletter Section Files

**Find newsletter section files in your theme:**

Newsletter sections might be:
- `sections/newsletter.liquid`
- `sections/email-signup.liquid`
- `sections/newsletter-signup.liquid`
- Or search for related files

**Action:**
```bash
# Search for newsletter files
find . -name "*newsletter*.liquid" -o -name "*email*signup*.liquid" | grep sections
```

**Note the files found:** _________________

**Key files to modify:**
- Newsletter section file
- Email signup snippets (if separate)

---

### Step 10.2: Create Backups

**Before making any changes:**

```bash
# Backup newsletter section
cp sections/newsletter.liquid sections/backup_newsletter.liquid

# Backup email signup if exists
cp sections/email-signup.liquid sections/backup_email-signup.liquid 2>/dev/null || true
```

**✅ Checkpoint:** Backups created

---

### Step 10.3: Add Newsletter Mobile CSS

**Location:** Add to your global CSS file (after Phase 9 code)

**Purpose:** Mobile-optimized newsletter form styling

**Add this code:**

```css
/* ============================================
   NEWSLETTER SECTION MOBILE OPTIMIZATION - Phase 10
   ============================================ */

@media (max-width: 768px) {
  /* Newsletter section container */
  .newsletter-section,
  .email-signup,
  .newsletter-signup,
  [class*="newsletter"] {
    padding: 2.5rem 1.25rem;
    text-align: center;
  }

  /* Newsletter heading */
  .newsletter-section__heading,
  .email-signup__heading {
    font-size: 1.75rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  /* Newsletter subheading/description */
  .newsletter-section__subheading,
  .newsletter-section__description,
  .email-signup__description {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin-bottom: 1.5rem;
    color: var(--color-text-secondary, #666);
    max-width: 100%;
  }

  /* Newsletter form */
  .newsletter-form,
  .email-signup__form {
    max-width: 100%;
    margin: 0 auto;
  }

  /* Form fields container - stacked vertically */
  .newsletter-form__fields,
  .email-signup__fields {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  /* Email input field */
  .newsletter-form__input,
  .newsletter-form input[type="email"],
  .email-signup__input {
    width: 100%;
    min-height: 48px;
    padding: 0.875rem 1rem;
    font-size: 0.9375rem;
    border: 1px solid var(--color-border, #ddd);
    border-radius: 6px;
    background: var(--color-background, #fff);
    color: var(--color-text, #000);
    -webkit-appearance: none;
    appearance: none;
  }

  .newsletter-form__input:focus,
  .email-signup__input:focus {
    outline: none;
    border-color: var(--color-accent, #000);
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
  }

  .newsletter-form__input::placeholder {
    color: var(--color-text-secondary, #999);
  }

  /* Input with error */
  .newsletter-form__input.error,
  .newsletter-form__input:invalid:not(:placeholder-shown) {
    border-color: var(--color-error, #c41e3a);
  }

  /* Submit button */
  .newsletter-form__button,
  .newsletter-form button[type="submit"],
  .email-signup__button {
    width: 100%;
    min-height: 48px;
    padding: 0.875rem 1.5rem;
    font-size: 0.9375rem;
    font-weight: 600;
    text-align: center;
    border-radius: 6px;
    background: var(--color-button, #000);
    color: var(--color-button-text, #fff);
    border: none;
    cursor: pointer;
    transition: all 0.2s ease;
    -webkit-appearance: none;
    appearance: none;
  }

  .newsletter-form__button:hover {
    background: var(--color-button-hover, #333);
  }

  .newsletter-form__button:active {
    transform: scale(0.98);
  }

  .newsletter-form__button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Loading state */
  .newsletter-form__button.loading {
    position: relative;
    color: transparent;
    pointer-events: none;
  }

  .newsletter-form__button.loading::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 255, 255, 0.3);
    border-top-color: white;
    border-radius: 50%;
    animation: newsletter-spinner 0.8s linear infinite;
  }

  @keyframes newsletter-spinner {
    to { transform: translate(-50%, -50%) rotate(360deg); }
  }

  /* Checkbox/consent field */
  .newsletter-form__consent,
  .newsletter-form__checkbox-wrapper {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    text-align: left;
    margin-top: 0.75rem;
  }

  .newsletter-form__checkbox {
    width: 20px;
    height: 20px;
    min-width: 20px;
    margin-top: 0.125rem;
    cursor: pointer;
  }

  .newsletter-form__consent-text {
    font-size: 0.8125rem;
    line-height: 1.5;
    color: var(--color-text-secondary, #666);
  }

  .newsletter-form__consent-text a {
    color: var(--color-link, #0066cc);
    text-decoration: underline;
  }

  /* Success message */
  .newsletter-form__success,
  .newsletter-success {
    padding: 1rem;
    background: var(--color-success-bg, #d4edda);
    border: 1px solid var(--color-success, #28a745);
    border-radius: 6px;
    color: var(--color-success-text, #155724);
    font-size: 0.9375rem;
    display: none;
  }

  .newsletter-form__success.active,
  .newsletter-success.active {
    display: block;
  }

  /* Error message */
  .newsletter-form__error,
  .newsletter-error {
    padding: 1rem;
    background: var(--color-error-bg, #f8d7da);
    border: 1px solid var(--color-error, #c41e3a);
    border-radius: 6px;
    color: var(--color-error-text, #721c24);
    font-size: 0.9375rem;
    display: none;
    margin-top: 0.75rem;
  }

  .newsletter-form__error.active,
  .newsletter-error.active {
    display: block;
  }

  /* Field error message (inline) */
  .newsletter-form__field-error {
    font-size: 0.8125rem;
    color: var(--color-error, #c41e3a);
    margin-top: 0.25rem;
    text-align: left;
    display: none;
  }

  .newsletter-form__field-error.active {
    display: block;
  }

  /* Privacy text below form */
  .newsletter-form__privacy,
  .newsletter__privacy {
    font-size: 0.75rem;
    line-height: 1.5;
    color: var(--color-text-secondary, #666);
    margin-top: 1rem;
  }

  .newsletter-form__privacy a {
    color: inherit;
    text-decoration: underline;
  }

  /* Benefits list (optional) */
  .newsletter-section__benefits {
    margin-top: 1.5rem;
    text-align: left;
  }

  .newsletter-section__benefits ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }

  .newsletter-section__benefits li {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    font-size: 0.9375rem;
    line-height: 1.5;
  }

  .newsletter-section__benefits li::before {
    content: '✓';
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    min-width: 20px;
    background: var(--color-success, #28a745);
    color: white;
    border-radius: 50%;
    font-weight: 600;
    font-size: 0.75rem;
    margin-top: 0.125rem;
  }

  /* Social proof (subscriber count, etc.) */
  .newsletter-section__social-proof {
    margin-top: 1rem;
    font-size: 0.8125rem;
    color: var(--color-text-secondary, #666);
  }

  .newsletter-section__social-proof strong {
    color: var(--color-text, #000);
    font-weight: 600;
  }
}

/* Extra small phones */
@media (max-width: 390px) {
  .newsletter-section,
  .email-signup {
    padding: 2rem 1rem;
  }

  .newsletter-section__heading {
    font-size: 1.5rem;
  }

  .newsletter-form__input,
  .newsletter-form__button {
    min-height: 52px;
    padding: 1rem;
  }

  .newsletter-section__benefits {
    margin-top: 1.25rem;
  }
}
```

**✅ Checkpoint:** Newsletter mobile CSS added. Save the file.

---

### Step 10.4: Add Newsletter Layout Variations

**Location:** Add immediately after the newsletter CSS

**Purpose:** Different newsletter presentation styles

**Add this code:**

```css
/* Newsletter Layout Variations */
@media (max-width: 768px) {
  /* Inline form - input and button side-by-side (not recommended < 500px) */
  .newsletter-section--inline .newsletter-form__fields {
    flex-direction: row;
    gap: 0.5rem;
  }

  .newsletter-section--inline .newsletter-form__input {
    flex: 1;
  }

  .newsletter-section--inline .newsletter-form__button {
    width: auto;
    min-width: 100px;
  }

  /* Compact style - less padding */
  .newsletter-section--compact {
    padding: 2rem 1.25rem;
  }

  .newsletter-section--compact .newsletter-section__heading {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .newsletter-section--compact .newsletter-section__description {
    margin-bottom: 1rem;
  }

  /* Spacious style - more breathing room */
  .newsletter-section--spacious {
    padding: 3rem 1.25rem;
  }

  .newsletter-section--spacious .newsletter-section__heading {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  .newsletter-section--spacious .newsletter-section__description {
    margin-bottom: 2rem;
  }

  /* Card style - bordered with background */
  .newsletter-section--card {
    margin: 1.25rem;
    padding: 2rem 1.5rem;
    background: var(--color-background-secondary, #f9f9f9);
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  }

  /* Bordered style */
  .newsletter-section--bordered {
    border: 2px solid var(--color-border, #e5e5e5);
    border-radius: 8px;
    margin: 1.25rem;
  }

  /* Full-width style - edge to edge */
  .newsletter-section--full-width {
    padding-left: 0;
    padding-right: 0;
    border-radius: 0;
  }

  .newsletter-section--full-width .newsletter-form {
    padding-left: 1.25rem;
    padding-right: 1.25rem;
  }

  /* Minimal style - no background, simple */
  .newsletter-section--minimal {
    padding: 2rem 1.25rem;
    background: transparent;
  }

  .newsletter-section--minimal .newsletter-form__input {
    border: none;
    border-bottom: 2px solid var(--color-border, #ddd);
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
  }

  .newsletter-section--minimal .newsletter-form__button {
    border-radius: 0;
  }

  /* Popup/modal style */
  .newsletter-section--popup {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1.5rem 1.25rem;
    background: white;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.15);
    z-index: 100;
    transform: translateY(100%);
    transition: transform 0.3s ease;
  }

  .newsletter-section--popup.active {
    transform: translateY(0);
  }

  .newsletter-section--popup .newsletter-section__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    width: 32px;
    height: 32px;
    background: transparent;
    border: none;
    cursor: pointer;
    font-size: 1.5rem;
    color: var(--color-text-secondary, #666);
  }

  /* Left-aligned text */
  .newsletter-section--left {
    text-align: left;
  }

  .newsletter-section--left .newsletter-section__heading,
  .newsletter-section--left .newsletter-section__description {
    text-align: left;
  }

  /* Background image style */
  .newsletter-section--bg-image {
    position: relative;
    color: white;
    padding: 3rem 1.25rem;
  }

  .newsletter-section--bg-image::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  .newsletter-section--bg-image > * {
    position: relative;
    z-index: 2;
  }

  .newsletter-section--bg-image .newsletter-section__heading,
  .newsletter-section--bg-image .newsletter-section__description {
    color: white;
  }

  .newsletter-section--bg-image .newsletter-form__input {
    background: rgba(255, 255, 255, 0.95);
  }
}

@media (max-width: 500px) {
  /* Force stacked layout on very small screens */
  .newsletter-section--inline .newsletter-form__fields {
    flex-direction: column;
  }

  .newsletter-section--inline .newsletter-form__button {
    width: 100%;
  }
}

@media (max-width: 390px) {
  .newsletter-section--card,
  .newsletter-section--bordered {
    margin: 1rem;
    padding: 1.5rem 1rem;
  }

  .newsletter-section--spacious {
    padding: 2.5rem 1rem;
  }

  .newsletter-section--popup {
    padding: 1.25rem 1rem;
  }
}
```

**✅ Checkpoint:** Newsletter layout variations added. Save the file.

---

### Step 10.5: Add Newsletter JavaScript Functionality

**Purpose:** Form validation, submission, and success/error handling

**Add this JavaScript:**

```javascript
/* Newsletter Form Functionality */
document.addEventListener('DOMContentLoaded', function() {
  
  const newsletterForms = document.querySelectorAll('.newsletter-form, .email-signup__form');
  
  newsletterForms.forEach(function(form) {
    const emailInput = form.querySelector('input[type="email"]');
    const submitButton = form.querySelector('button[type="submit"]');
    const successMessage = form.querySelector('.newsletter-form__success, .newsletter-success');
    const errorMessage = form.querySelector('.newsletter-form__error, .newsletter-error');
    const fieldError = form.querySelector('.newsletter-form__field-error');
    
    // Email validation
    function isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Show error
    function showError(message) {
      if (errorMessage) {
        errorMessage.textContent = message;
        errorMessage.classList.add('active');
      }
      if (fieldError) {
        fieldError.textContent = message;
        fieldError.classList.add('active');
      }
      if (emailInput) {
        emailInput.classList.add('error');
      }
    }
    
    // Hide error
    function hideError() {
      if (errorMessage) {
        errorMessage.classList.remove('active');
      }
      if (fieldError) {
        fieldError.classList.remove('active');
      }
      if (emailInput) {
        emailInput.classList.remove('error');
      }
    }
    
    // Show success
    function showSuccess() {
      if (successMessage) {
        successMessage.classList.add('active');
      }
      hideError();
      form.reset();
    }
    
    // Real-time validation on input
    if (emailInput) {
      emailInput.addEventListener('input', function() {
        if (this.value && !isValidEmail(this.value)) {
          showError('Please enter a valid email address');
        } else {
          hideError();
        }
      });
      
      emailInput.addEventListener('blur', function() {
        if (this.value && !isValidEmail(this.value)) {
          showError('Please enter a valid email address');
        }
      });
    }
    
    // Form submission
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      hideError();
      
      const email = emailInput ? emailInput.value.trim() : '';
      
      // Validate email
      if (!email) {
        showError('Please enter your email address');
        return;
      }
      
      if (!isValidEmail(email)) {
        showError('Please enter a valid email address');
        return;
      }
      
      // Show loading state
      if (submitButton) {
        submitButton.classList.add('loading');
        submitButton.disabled = true;
      }
      
      // Submit to your newsletter service
      // This is a placeholder - replace with your actual submission logic
      const formData = new FormData(form);
      
      fetch(form.action || '/contact', {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        }
      })
      .then(response => {
        if (submitButton) {
          submitButton.classList.remove('loading');
          submitButton.disabled = false;
        }
        
        if (response.ok) {
          showSuccess();
        } else {
          showError('Something went wrong. Please try again.');
        }
      })
      .catch(error => {
        if (submitButton) {
          submitButton.classList.remove('loading');
          submitButton.disabled = false;
        }
        showError('Something went wrong. Please try again.');
      });
    });
  });
  
  // Popup newsletter functionality
  const popupNewsletter = document.querySelector('.newsletter-section--popup');
  if (popupNewsletter) {
    const closeButton = popupNewsletter.querySelector('.newsletter-section__close');
    
    // Show popup after delay (e.g., 5 seconds)
    setTimeout(function() {
      const hasSeenPopup = localStorage.getItem('newsletter-popup-seen');
      if (!hasSeenPopup) {
        popupNewsletter.classList.add('active');
      }
    }, 5000);
    
    // Close popup
    if (closeButton) {
      closeButton.addEventListener('click', function() {
        popupNewsletter.classList.remove('active');
        localStorage.setItem('newsletter-popup-seen', 'true');
      });
    }
    
    // Close on successful submission
    const form = popupNewsletter.querySelector('form');
    if (form) {
      form.addEventListener('submit', function() {
        setTimeout(function() {
          popupNewsletter.classList.remove('active');
          localStorage.setItem('newsletter-popup-seen', 'true');
        }, 2000);
      });
    }
  }
  
});
```

**✅ Checkpoint:** Newsletter JavaScript added.

---

### Step 10.6: Update Newsletter Markup (If Needed)

**This step is OPTIONAL** - Only if markup needs optimization.

**Location:** In your newsletter file (e.g., `sections/newsletter.liquid`)

**Optimized newsletter markup:**

```liquid
<section class="newsletter-section newsletter-section--{{ section.settings.style }}">
  <div class="newsletter-section__wrapper page-width">
    
    {% if section.settings.heading != blank %}
      <h2 class="newsletter-section__heading">{{ section.settings.heading }}</h2>
    {% endif %}

    {% if section.settings.description != blank %}
      <div class="newsletter-section__description rte">
        {{ section.settings.description }}
      </div>
    {% endif %}

    {% form 'customer', class: 'newsletter-form' %}
      
      <input type="hidden" name="contact[tags]" value="newsletter">
      
      <div class="newsletter-form__fields">
        <div class="newsletter-form__field">
          <label for="newsletter-email-{{ section.id }}" class="visually-hidden">
            Email address
          </label>
          <input 
            type="email"
            name="contact[email]"
            id="newsletter-email-{{ section.id }}"
            class="newsletter-form__input"
            placeholder="{{ section.settings.placeholder | default: 'Enter your email' }}"
            required
            aria-required="true"
            aria-describedby="newsletter-error-{{ section.id }}"
          >
          <div class="newsletter-form__field-error" id="newsletter-error-{{ section.id }}" role="alert"></div>
        </div>

        {% if section.settings.show_consent %}
          <div class="newsletter-form__consent">
            <input 
              type="checkbox"
              id="newsletter-consent-{{ section.id }}"
              class="newsletter-form__checkbox"
              required
            >
            <label for="newsletter-consent-{{ section.id }}" class="newsletter-form__consent-text">
              I agree to receive marketing emails. 
              {% if section.settings.privacy_policy_url %}
                <a href="{{ section.settings.privacy_policy_url }}">Privacy Policy</a>
              {% endif %}
            </label>
          </div>
        {% endif %}

        <button 
          type="submit"
          class="newsletter-form__button"
          aria-label="Subscribe to newsletter"
        >
          {{ section.settings.button_text | default: 'Subscribe' }}
        </button>
      </div>

      <div class="newsletter-form__success" role="status">
        {{ section.settings.success_message | default: 'Thanks for subscribing!' }}
      </div>

      <div class="newsletter-form__error" role="alert"></div>

      {% if section.settings.privacy_text != blank %}
        <p class="newsletter-form__privacy">
          {{ section.settings.privacy_text }}
        </p>
      {% endif %}

    {% endform %}

    {% if section.settings.show_benefits %}
      <div class="newsletter-section__benefits">
        <ul>
          {% for block in section.blocks %}
            {% if block.type == 'benefit' %}
              <li>{{ block.settings.text }}</li>
            {% endif %}
          {% endfor %}
        </ul>
      </div>
    {% endif %}

    {% if section.settings.social_proof != blank %}
      <p class="newsletter-section__social-proof">
        {{ section.settings.social_proof }}
      </p>
    {% endif %}

  </div>
</section>
```

**Key improvements:**
- Proper form structure with Shopify customer form
- Accessible labels and ARIA attributes
- Email validation with HTML5
- Optional consent checkbox
- Success/error message areas
- Benefits list support
- Social proof display
- Privacy policy link

**✅ Checkpoint:** Newsletter markup updated. Save the file.

---

### Step 10.7: Add Section Settings for Customization

**Purpose:** Allow customization through theme editor

**Add to your section schema:**

```liquid
{% schema %}
{
  "name": "Newsletter",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "Subscribe to our newsletter"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Description",
      "default": "<p>Get updates on new products, special offers, and van life tips.</p>"
    },
    {
      "type": "text",
      "id": "placeholder",
      "label": "Email placeholder",
      "default": "Enter your email"
    },
    {
      "type": "text",
      "id": "button_text",
      "label": "Button text",
      "default": "Subscribe"
    },
    {
      "type": "select",
      "id": "style",
      "label": "Mobile Style",
      "options": [
        {
          "value": "default",
          "label": "Default"
        },
        {
          "value": "compact",
          "label": "Compact"
        },
        {
          "value": "spacious",
          "label": "Spacious"
        },
        {
          "value": "card",
          "label": "Card"
        },
        {
          "value": "bordered",
          "label": "Bordered"
        },
        {
          "value": "minimal",
          "label": "Minimal"
        },
        {
          "value": "left",
          "label": "Left-aligned"
        }
      ],
      "default": "default"
    },
    {
      "type": "checkbox",
      "id": "show_consent",
      "label": "Show consent checkbox",
      "default": true
    },
    {
      "type": "url",
      "id": "privacy_policy_url",
      "label": "Privacy policy URL"
    },
    {
      "type": "text",
      "id": "success_message",
      "label": "Success message",
      "default": "Thanks for subscribing!"
    },
    {
      "type": "textarea",
      "id": "privacy_text",
      "label": "Privacy text",
      "info": "Small text below form",
      "default": "We respect your privacy. Unsubscribe at any time."
    },
    {
      "type": "checkbox",
      "id": "show_benefits",
      "label": "Show benefits list",
      "default": false
    },
    {
      "type": "text",
      "id": "social_proof",
      "label": "Social proof text",
      "info": "E.g., 'Join 10,000+ subscribers'",
      "default": ""
    }
  ],
  "blocks": [
    {
      "type": "benefit",
      "name": "Benefit",
      "settings": [
        {
          "type": "text",
          "id": "text",
          "label": "Benefit text",
          "default": "Exclusive offers and discounts"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Newsletter",
      "blocks": [
        {
          "type": "benefit",
          "settings": {
            "text": "Exclusive discounts and offers"
          }
        },
        {
          "type": "benefit",
          "settings": {
            "text": "New product announcements"
          }
        },
        {
          "type": "benefit",
          "settings": {
            "text": "Van life tips and inspiration"
          }
        }
      ]
    }
  ]
}
{% endschema %}
```

**Apply classes dynamically:**
```liquid
<section class="newsletter-section newsletter-section--{{ section.settings.style }}">
```

**✅ Checkpoint:** Section settings configured.

---

### Step 10.8: Test Newsletter Section on Mobile

**Testing Steps:**

1. **Push changes to development theme:**
   ```bash
   shopify theme push
   ```

2. **Test on multiple screen sizes:**
   - iPhone SE (375px) - Compact view
   - Standard mobile (390px-768px) - Standard view
   - Test in portrait orientation

3. **Check newsletter section specifically:**

   **Visual Tests:**
   - [ ] Form fields are full-width
   - [ ] Input field is properly sized (min 48px height)
   - [ ] Submit button is prominent and full-width
   - [ ] Text is centered and readable
   - [ ] Spacing is comfortable
   - [ ] Success/error messages display correctly

   **Layout Tests:**
   - [ ] Fields stack vertically
   - [ ] No horizontal scrolling
   - [ ] Button below input field
   - [ ] Proper spacing between elements
   - [ ] Checkbox (if present) aligns properly
   - [ ] Privacy text is readable

   **Interactive Tests:**
   - [ ] Email input is tappable
   - [ ] Keyboard opens with email type
   - [ ] Submit button is tappable (min 48px)
   - [ ] Form validation works
   - [ ] Error messages display inline
   - [ ] Success message shows after submit
   - [ ] Loading state shows during submission
   - [ ] Checkbox works (if present)

   **Form Tests:**
   - [ ] Email validation works (invalid format shows error)
   - [ ] Required field validation
   - [ ] Placeholder text visible
   - [ ] Label accessible (screen reader)
   - [ ] Consent checkbox required (if enabled)
   - [ ] Form submits correctly
   - [ ] Success message appears
   - [ ] Form resets after success

4. **Test style variations:**
   - Default
   - Compact
   - Spacious
   - Card
   - Bordered
   - Minimal
   - Left-aligned

5. **Test error scenarios:**
   - Empty email submission
   - Invalid email format
   - Network error
   - Missing consent (if required)

6. **Performance check:**
   - [ ] Form responds instantly
   - [ ] No layout shift
   - [ ] Smooth animations
   - [ ] Quick submission

---

### Step 10.9: Common Newsletter Issues & Fixes

**Issue 1: Input field too small on mobile**
```css
@media (max-width: 768px) {
  .newsletter-form__input {
    min-height: 48px !important;
    font-size: 16px !important; /* Prevents zoom on iOS */
    padding: 0.875rem 1rem !important;
  }
}
```

**Issue 2: Button not full-width**
```css
@media (max-width: 768px) {
  .newsletter-form__button {
    width: 100% !important;
    display: block !important;
  }
}
```

**Issue 3: iOS zoom on input focus**
```css
@media (max-width: 768px) {
  .newsletter-form__input {
    font-size: 16px !important; /* Must be 16px or larger */
  }
}
```

**Issue 4: Form not submitting**
```javascript
form.addEventListener('submit', function(e) {
  e.preventDefault();
  
  // Ensure form has action
  const formAction = this.action || '/contact';
  
  // Submit form
  fetch(formAction, {
    method: 'POST',
    body: new FormData(this)
  });
});
```

**Issue 5: Error message not showing**
```javascript
function showError(message) {
  const errorEl = document.querySelector('.newsletter-form__error');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.style.display = 'block';
    errorEl.classList.add('active');
  }
}
```

**Issue 6: Success message not clearing form**
```javascript
function showSuccess() {
  form.reset(); // Clear form
  successMessage.classList.add('active');
  setTimeout(() => {
    successMessage.classList.remove('active');
  }, 5000);
}
```

---

### Step 10.10: Verify Newsletter Accessibility

**Accessibility Checklist:**

- [ ] **Form labels**: Visible or visually-hidden labels for screen readers
- [ ] **Email input**: Proper type="email" for mobile keyboard
- [ ] **Required fields**: aria-required="true" attribute
- [ ] **Error messages**: role="alert" and aria-describedby
- [ ] **Success messages**: role="status" for announcements
- [ ] **Focus states**: Visible focus indicators on all inputs
- [ ] **Touch targets**: Button min 48px × 48px
- [ ] **Color contrast**: Text meets 4.5:1 ratio
- [ ] **Keyboard navigation**: Tab through all form elements

**Test with screen reader:**
```html
<!-- Accessible newsletter form -->
<form class="newsletter-form" aria-label="Newsletter signup">
  <div class="newsletter-form__field">
    <label for="newsletter-email" class="visually-hidden">
      Email address
    </label>
    <input 
      type="email"
      id="newsletter-email"
      name="email"
      placeholder="Enter your email"
      required
      aria-required="true"
      aria-invalid="false"
      aria-describedby="newsletter-error"
    >
    <div 
      id="newsletter-error"
      class="newsletter-form__field-error"
      role="alert"
      aria-live="polite"
    ></div>
  </div>

  <button type="submit" aria-label="Subscribe to newsletter">
    Subscribe
  </button>

  <div class="newsletter-form__success" role="status" aria-live="polite">
    Thanks for subscribing!
  </div>
</form>
```

**Update ARIA on validation:**
```javascript
emailInput.addEventListener('blur', function() {
  const isValid = isValidEmail(this.value);
  this.setAttribute('aria-invalid', !isValid);
});
```

---

### Step 10.11: Document Newsletter Implementation

**What We Optimized:**

✅ **Stacked vertical layout** optimized for mobile  
✅ **Full-width form fields** with comfortable spacing  
✅ **Large submit button** (min 48px height)  
✅ **Email validation** with real-time feedback  
✅ **Success/error messages** with proper display  
✅ **Loading state** during form submission  
✅ **Consent checkbox** with privacy policy link  
✅ **10 style variations** for different designs  
✅ **Benefits list** to highlight value  
✅ **Social proof** display (subscriber count)  
✅ **Accessible form** with ARIA attributes  
✅ **Mobile keyboard optimization** (email type, 16px font)  

**Classes Available:**

**Styles:**
- `.newsletter-section--default` - Standard layout
- `.newsletter-section--compact` - Less padding
- `.newsletter-section--spacious` - More breathing room
- `.newsletter-section--card` - Card with background
- `.newsletter-section--bordered` - Bordered style
- `.newsletter-section--minimal` - Simple, no background
- `.newsletter-section--left` - Left-aligned text
- `.newsletter-section--inline` - Input + button side-by-side (> 500px)
- `.newsletter-section--popup` - Bottom popup/modal
- `.newsletter-section--bg-image` - Background image with overlay

**Mobile Breakpoints:**
- `768px` - Mobile newsletter styles
- `500px` - Force stacked layout for inline style
- `390px` - Adjusted padding and spacing

**Features:**
- Email validation (HTML5 + JavaScript)
- Real-time error feedback
- Loading state on submit
- Success message display
- Form reset after success
- Privacy compliance (consent checkbox)
- Popup functionality (optional)
- Local storage (popup seen state)

**Best Practices:**
- 16px minimum font size (prevents iOS zoom)
- type="email" for mobile keyboard
- Required attribute for validation
- ARIA attributes for accessibility
- Clear error messages
- Visual feedback on all states

---

## ✅ Phase 10 Complete - Newsletter Section Optimized!

**Results:**
- Full-width stacked form layout optimized for mobile
- Large, easy-to-tap submit button (48px height)
- Email validation with clear error feedback
- Success and error message handling
- Loading state during submission
- Consent checkbox with privacy policy link
- Multiple style variations for different needs
- Benefits list to encourage signups
- Social proof support
- Fully accessible with proper ARIA
- Mobile keyboard optimized (no zoom on focus)

**Before moving to Phase 11:**
1. Test newsletter form on various pages
2. Verify form submission works
3. Test email validation
4. Check success/error messages display
5. Verify consent checkbox works (if enabled)
6. Test on actual mobile device
7. Test with keyboard navigation
8. Test with screen reader
9. Verify no iOS zoom on input focus

---

**Next:** Phase 11 - Testimonials Section Optimization (Final Phase!)

*Once Phase 10 testing is complete, proceed to Phase 11.*

---

## Phase 11: Testimonials Section Optimization

**Time Estimate:** 35-45 minutes  
**Purpose:** Optimize testimonials sections for mobile with vertical stacking, readable quotes, author information, and star ratings

**Implementation:** Vertical Stack (Option A)
- Testimonials stacked vertically (no carousel)
- Readable quote text with proper formatting
- Author name, photo, and credentials
- Star rating display
- Card-based design with comfortable spacing
- Optional company/product information

---

### Step 11.1: Locate Testimonials Section Files

**Find testimonials section files in your theme:**

Testimonials sections might be:
- `sections/testimonials.liquid`
- `sections/reviews.liquid`
- `sections/customer-reviews.liquid`
- Or search for related files

**Action:**
```bash
# Search for testimonials files
find . -name "*testimonial*.liquid" -o -name "*review*.liquid" | grep sections
```

**Note the files found:** _________________

**Key files to modify:**
- Testimonials section file
- Any testimonial card snippets

---

### Step 11.2: Create Backups

**Before making any changes:**

```bash
# Backup testimonials section
cp sections/testimonials.liquid sections/backup_testimonials.liquid

# Backup reviews if exists
cp sections/reviews.liquid sections/backup_reviews.liquid 2>/dev/null || true

# Backup customer reviews if exists
cp sections/customer-reviews.liquid sections/backup_customer-reviews.liquid 2>/dev/null || true
```

**✅ Checkpoint:** Backups created

---

### Step 11.3: Add Testimonials Mobile CSS

**Location:** Add to your global CSS file (after Phase 10 code)

**Purpose:** Mobile-optimized testimonials display with vertical stacking

**Add this code:**

```css
/* ============================================
   TESTIMONIALS SECTION MOBILE OPTIMIZATION - Phase 11
   ============================================ */

@media (max-width: 768px) {
  /* Testimonials section container */
  .testimonials-section,
  .reviews-section,
  .customer-reviews,
  [class*="testimonial"] {
    padding: 2.5rem 1.25rem;
  }

  /* Section heading */
  .testimonials-section__heading,
  .reviews-section__heading {
    font-size: 1.75rem;
    margin-bottom: 1rem;
    text-align: center;
    font-weight: 600;
  }

  /* Section description */
  .testimonials-section__description {
    font-size: 0.9375rem;
    line-height: 1.6;
    margin-bottom: 2rem;
    text-align: center;
    color: var(--color-text-secondary, #666);
  }

  /* Testimonials container - vertical stack */
  .testimonials-section__items,
  .testimonials-grid,
  .reviews-list {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  /* Individual testimonial card */
  .testimonial-card,
  .testimonial-item,
  .review-card {
    background: var(--color-background, #fff);
    border: 1px solid var(--color-border, #e5e5e5);
    border-radius: 12px;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    transition: all 0.2s ease;
  }

  .testimonial-card:active {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  /* Star rating */
  .testimonial-card__rating,
  .review-rating,
  .stars {
    display: flex;
    gap: 0.25rem;
    align-items: center;
  }

  .testimonial-card__star,
  .star {
    width: 18px;
    height: 18px;
    fill: var(--color-rating, #ffc107);
  }

  .testimonial-card__star--empty,
  .star--empty {
    fill: var(--color-border, #ddd);
  }

  /* Quote/review text */
  .testimonial-card__quote,
  .testimonial-card__text,
  .review-text {
    font-size: 0.9375rem;
    line-height: 1.7;
    color: var(--color-text, #333);
    margin: 0;
  }

  /* Quote marks (if using decorative quotes) */
  .testimonial-card__quote::before {
    content: '"';
    font-size: 2.5rem;
    line-height: 0;
    color: var(--color-text-secondary, #ddd);
    margin-right: 0.25rem;
    float: left;
    margin-top: 0.25rem;
  }

  .testimonial-card__quote::after {
    content: '"';
    font-size: 2.5rem;
    line-height: 0;
    color: var(--color-text-secondary, #ddd);
    margin-left: 0.25rem;
  }

  /* Remove quote marks variation */
  .testimonial-card--no-quotes .testimonial-card__quote::before,
  .testimonial-card--no-quotes .testimonial-card__quote::after {
    content: none;
  }

  /* Author information container */
  .testimonial-card__author,
  .review-author {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    margin-top: auto;
  }

  /* Author photo */
  .testimonial-card__photo,
  .review-author__photo {
    width: 48px;
    height: 48px;
    min-width: 48px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid var(--color-border, #e5e5e5);
  }

  /* Author info (name + title) */
  .testimonial-card__info,
  .review-author__info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  /* Author name */
  .testimonial-card__name,
  .review-author__name {
    font-size: 0.9375rem;
    font-weight: 600;
    color: var(--color-text, #000);
    margin: 0;
  }

  /* Author title/company */
  .testimonial-card__title,
  .testimonial-card__company,
  .review-author__title {
    font-size: 0.8125rem;
    color: var(--color-text-secondary, #666);
    margin: 0;
  }

  /* Verified badge */
  .testimonial-card__verified,
  .review-verified {
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;
    font-size: 0.75rem;
    color: var(--color-success, #28a745);
    font-weight: 600;
  }

  .testimonial-card__verified svg {
    width: 14px;
    height: 14px;
    fill: currentColor;
  }

  /* Product/Service mentioned */
  .testimonial-card__product {
    display: inline-block;
    padding: 0.25rem 0.5rem;
    background: var(--color-background-secondary, #f0f0f0);
    border-radius: 4px;
    font-size: 0.75rem;
    color: var(--color-text-secondary, #666);
    margin-top: 0.5rem;
  }

  /* Date */
  .testimonial-card__date,
  .review-date {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #999);
    margin-left: auto;
  }

  /* Overall rating summary (if showing aggregate) */
  .testimonials-section__summary {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    padding: 1.5rem;
    background: var(--color-background-secondary, #f9f9f9);
    border-radius: 8px;
    margin-bottom: 2rem;
  }

  .testimonials-section__average {
    font-size: 2.5rem;
    font-weight: 700;
    line-height: 1;
    color: var(--color-text, #000);
  }

  .testimonials-section__total {
    font-size: 0.875rem;
    color: var(--color-text-secondary, #666);
  }

  /* Rating breakdown bars */
  .testimonials-section__breakdown {
    width: 100%;
    margin-top: 1rem;
  }

  .rating-bar {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
  }

  .rating-bar__label {
    font-size: 0.8125rem;
    min-width: 40px;
  }

  .rating-bar__track {
    flex: 1;
    height: 8px;
    background: var(--color-background-secondary, #e5e5e5);
    border-radius: 4px;
    overflow: hidden;
  }

  .rating-bar__fill {
    height: 100%;
    background: var(--color-rating, #ffc107);
    border-radius: 4px;
    transition: width 0.3s ease;
  }

  .rating-bar__count {
    font-size: 0.75rem;
    color: var(--color-text-secondary, #999);
    min-width: 30px;
    text-align: right;
  }

  /* Load more button */
  .testimonials-section__load-more {
    margin-top: 2rem;
    text-align: center;
  }

  .testimonials-section__load-more-button {
    min-height: 48px;
    padding: 0.875rem 2rem;
    font-size: 0.9375rem;
    font-weight: 600;
    background: var(--color-button, #000);
    color: var(--color-button-text, #fff);
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .testimonials-section__load-more-button:active {
    transform: scale(0.98);
  }
}

/* Extra small phones */
@media (max-width: 390px) {
  .testimonials-section,
  .reviews-section {
    padding: 2rem 1rem;
  }

  .testimonials-section__heading {
    font-size: 1.5rem;
  }

  .testimonial-card {
    padding: 1.25rem 1rem;
  }

  .testimonials-section__items,
  .testimonials-grid {
    gap: 1rem;
  }

  .testimonial-card__quote::before {
    font-size: 2rem;
  }

  .testimonial-card__quote::after {
    font-size: 2rem;
  }

  .testimonials-section__average {
    font-size: 2rem;
  }
}
```

**✅ Checkpoint:** Testimonials mobile CSS added. Save the file.

---

### Step 11.4: Add Testimonials Style Variations

**Location:** Add immediately after the testimonials CSS

**Purpose:** Different testimonial presentation styles

**Add this code:**

```css
/* Testimonials Style Variations */
@media (max-width: 768px) {
  /* Minimal style - no borders, simple cards */
  .testimonials-section--minimal .testimonial-card {
    border: none;
    background: transparent;
    padding: 1.25rem 0;
    border-bottom: 1px solid var(--color-border, #e5e5e5);
    border-radius: 0;
  }

  .testimonials-section--minimal .testimonial-card:last-child {
    border-bottom: none;
  }

  /* Card style - shadow instead of border */
  .testimonials-section--cards .testimonial-card {
    border: none;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }

  /* Compact style - less spacing */
  .testimonials-section--compact .testimonials-section__items {
    gap: 1rem;
  }

  .testimonials-section--compact .testimonial-card {
    padding: 1.25rem;
  }

  .testimonials-section--compact .testimonial-card__quote {
    font-size: 0.875rem;
  }

  /* Spacious style - more breathing room */
  .testimonials-section--spacious .testimonials-section__items {
    gap: 1.75rem;
  }

  .testimonials-section--spacious .testimonial-card {
    padding: 2rem 1.5rem;
  }

  /* Highlighted style - colored background */
  .testimonials-section--highlighted .testimonial-card {
    background: var(--color-background-secondary, #f9f9f9);
    border-color: transparent;
  }

  /* Bordered left - accent on left side */
  .testimonials-section--bordered-left .testimonial-card {
    border-left: 4px solid var(--color-accent, #000);
  }

  /* Centered layout - center all content */
  .testimonials-section--centered .testimonial-card {
    text-align: center;
  }

  .testimonials-section--centered .testimonial-card__author {
    flex-direction: column;
    align-items: center;
  }

  .testimonials-section--centered .testimonial-card__info {
    align-items: center;
  }

  .testimonials-section--centered .testimonial-card__rating {
    justify-content: center;
  }

  /* Large quotes - bigger text */
  .testimonials-section--large .testimonial-card__quote {
    font-size: 1.0625rem;
    line-height: 1.65;
  }

  /* Small quotes - smaller text */
  .testimonials-section--small .testimonial-card__quote {
    font-size: 0.875rem;
  }

  .testimonials-section--small .testimonial-card__photo {
    width: 40px;
    height: 40px;
    min-width: 40px;
  }

  /* Photo first - image above quote */
  .testimonials-section--photo-first .testimonial-card {
    flex-direction: column-reverse;
  }

  .testimonials-section--photo-first .testimonial-card__author {
    margin-top: 0;
    margin-bottom: auto;
  }

  /* No photos - text only */
  .testimonials-section--no-photos .testimonial-card__photo {
    display: none;
  }

  /* Gradient background */
  .testimonials-section--gradient {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }

  .testimonials-section--gradient .testimonials-section__heading,
  .testimonials-section--gradient .testimonial-card__quote {
    color: white;
  }

  .testimonials-section--gradient .testimonial-card {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
  }
}

@media (max-width: 390px) {
  .testimonials-section--spacious .testimonials-section__items {
    gap: 1.5rem;
  }

  .testimonials-section--spacious .testimonial-card {
    padding: 1.75rem 1.25rem;
  }

  .testimonials-section--large .testimonial-card__quote {
    font-size: 1rem;
  }
}
```

**✅ Checkpoint:** Testimonials style variations added. Save the file.

---

### Step 11.5: Add Star Rating Component

**Purpose:** Reusable star rating display

**Add this CSS helper:**

```css
/* Star Rating Component */
@media (max-width: 768px) {
  /* Star rating display */
  .star-rating {
    display: inline-flex;
    gap: 0.25rem;
    align-items: center;
  }

  .star-rating__star {
    width: 18px;
    height: 18px;
  }

  .star-rating__star svg {
    width: 100%;
    height: 100%;
    fill: var(--color-rating, #ffc107);
  }

  .star-rating__star--empty svg {
    fill: var(--color-border, #ddd);
  }

  .star-rating__star--half svg {
    fill: url(#star-half-gradient);
  }

  /* Larger stars */
  .star-rating--large .star-rating__star {
    width: 24px;
    height: 24px;
  }

  /* Smaller stars */
  .star-rating--small .star-rating__star {
    width: 14px;
    height: 14px;
  }

  /* Numeric rating next to stars */
  .star-rating__number {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--color-text-secondary, #666);
    margin-left: 0.5rem;
  }
}
```

**✅ Checkpoint:** Star rating component added.

---

### Step 11.6: Update Testimonials Markup (If Needed)

**This step is OPTIONAL** - Only if markup needs optimization.

**Location:** In your testimonials file (e.g., `sections/testimonials.liquid`)

**Optimized testimonials markup:**

```liquid
<section class="testimonials-section testimonials-section--{{ section.settings.style }}">
  <div class="testimonials-section__wrapper page-width">
    
    {% if section.settings.heading != blank %}
      <h2 class="testimonials-section__heading">{{ section.settings.heading }}</h2>
    {% endif %}

    {% if section.settings.description != blank %}
      <div class="testimonials-section__description rte">
        {{ section.settings.description }}
      </div>
    {% endif %}

    {% if section.settings.show_summary %}
      <div class="testimonials-section__summary">
        <div class="testimonials-section__average">4.8</div>
        <div class="star-rating star-rating--large">
          {% for i in (1..5) %}
            <span class="star-rating__star">
              <svg viewBox="0 0 24 24"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
            </span>
          {% endfor %}
        </div>
        <p class="testimonials-section__total">Based on {{ section.blocks.size }} reviews</p>
      </div>
    {% endif %}

    <div class="testimonials-section__items">
      {% for block in section.blocks %}
        {% if block.type == 'testimonial' %}
          <article class="testimonial-card" {{ block.shopify_attributes }}>
            
            {%- comment -%} Star rating {%- endcomment -%}
            {% if block.settings.rating > 0 %}
              <div class="testimonial-card__rating star-rating" aria-label="Rating: {{ block.settings.rating }} out of 5 stars">
                {% for i in (1..5) %}
                  <span class="star-rating__star {% if i > block.settings.rating %}star-rating__star--empty{% endif %}">
                    <svg viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </span>
                {% endfor %}
              </div>
            {% endif %}

            {%- comment -%} Quote/Review text {%- endcomment -%}
            {% if block.settings.quote != blank %}
              <blockquote class="testimonial-card__quote">
                {{ block.settings.quote }}
              </blockquote>
            {% endif %}

            {%- comment -%} Product mentioned {%- endcomment -%}
            {% if block.settings.product != blank %}
              <span class="testimonial-card__product">{{ block.settings.product }}</span>
            {% endif %}

            {%- comment -%} Author information {%- endcomment -%}
            <div class="testimonial-card__author">
              {% if block.settings.author_photo %}
                <img 
                  src="{{ block.settings.author_photo | image_url: width: 96 }}"
                  alt="{{ block.settings.author_name | escape }}"
                  class="testimonial-card__photo"
                  loading="lazy"
                  width="48"
                  height="48"
                >
              {% endif %}
              
              <div class="testimonial-card__info">
                {% if block.settings.author_name != blank %}
                  <p class="testimonial-card__name">{{ block.settings.author_name }}</p>
                {% endif %}
                
                {% if block.settings.author_title != blank %}
                  <p class="testimonial-card__title">{{ block.settings.author_title }}</p>
                {% endif %}
                
                {% if block.settings.verified %}
                  <span class="testimonial-card__verified">
                    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Verified Buyer
                  </span>
                {% endif %}
              </div>

              {% if block.settings.date != blank %}
                <time class="testimonial-card__date" datetime="{{ block.settings.date }}">
                  {{ block.settings.date | date: '%b %d, %Y' }}
                </time>
              {% endif %}
            </div>

          </article>
        {% endif %}
      {% endfor %}
    </div>

    {% if section.settings.show_load_more %}
      <div class="testimonials-section__load-more">
        <button class="testimonials-section__load-more-button" type="button">
          Load More Reviews
        </button>
      </div>
    {% endif %}

  </div>
</section>
```

**Key improvements:**
- Semantic HTML with `<article>` and `<blockquote>`
- Accessible star ratings with ARIA labels
- Author photo with lazy loading
- Verified buyer badge
- Product mention support
- Date display with proper `<time>` element
- Load more functionality
- Shopify block attributes for theme editor

**✅ Checkpoint:** Testimonials markup updated. Save the file.

---

### Step 11.7: Add Section Settings for Customization

**Purpose:** Allow customization through theme editor

**Add to your section schema:**

```liquid
{% schema %}
{
  "name": "Testimonials",
  "settings": [
    {
      "type": "text",
      "id": "heading",
      "label": "Heading",
      "default": "What Our Customers Say"
    },
    {
      "type": "richtext",
      "id": "description",
      "label": "Description"
    },
    {
      "type": "select",
      "id": "style",
      "label": "Mobile Style",
      "options": [
        {
          "value": "default",
          "label": "Default (Bordered cards)"
        },
        {
          "value": "minimal",
          "label": "Minimal (Simple dividers)"
        },
        {
          "value": "cards",
          "label": "Cards (Shadow)"
        },
        {
          "value": "compact",
          "label": "Compact (Less spacing)"
        },
        {
          "value": "spacious",
          "label": "Spacious (More spacing)"
        },
        {
          "value": "highlighted",
          "label": "Highlighted (Background)"
        },
        {
          "value": "bordered-left",
          "label": "Bordered left (Accent stripe)"
        },
        {
          "value": "centered",
          "label": "Centered (All content centered)"
        }
      ],
      "default": "default"
    },
    {
      "type": "checkbox",
      "id": "show_summary",
      "label": "Show rating summary",
      "default": false
    },
    {
      "type": "checkbox",
      "id": "show_load_more",
      "label": "Show load more button",
      "default": false
    }
  ],
  "blocks": [
    {
      "type": "testimonial",
      "name": "Testimonial",
      "settings": [
        {
          "type": "range",
          "id": "rating",
          "label": "Star rating",
          "min": 1,
          "max": 5,
          "step": 1,
          "default": 5
        },
        {
          "type": "textarea",
          "id": "quote",
          "label": "Quote/Review",
          "default": "This product exceeded my expectations! Highly recommended."
        },
        {
          "type": "text",
          "id": "product",
          "label": "Product mentioned",
          "info": "Optional - product or service reviewed"
        },
        {
          "type": "image_picker",
          "id": "author_photo",
          "label": "Author photo"
        },
        {
          "type": "text",
          "id": "author_name",
          "label": "Author name",
          "default": "John Smith"
        },
        {
          "type": "text",
          "id": "author_title",
          "label": "Author title/company",
          "default": "Van Life Enthusiast"
        },
        {
          "type": "checkbox",
          "id": "verified",
          "label": "Verified buyer",
          "default": false
        },
        {
          "type": "text",
          "id": "date",
          "label": "Date",
          "info": "Format: YYYY-MM-DD"
        }
      ]
    }
  ],
  "presets": [
    {
      "name": "Testimonials",
      "blocks": [
        {
          "type": "testimonial",
          "settings": {
            "rating": 5,
            "quote": "The quality is exceptional and the customer service is outstanding. Couldn't be happier with my purchase!",
            "author_name": "Sarah Johnson",
            "author_title": "Adventure Traveler",
            "verified": true
          }
        },
        {
          "type": "testimonial",
          "settings": {
            "rating": 5,
            "quote": "Best investment I've made for my van conversion. Everything fits perfectly and looks amazing!",
            "author_name": "Mike Davis",
            "author_title": "Van Builder",
            "verified": true
          }
        },
        {
          "type": "testimonial",
          "settings": {
            "rating": 5,
            "quote": "Fast shipping, great quality, and helpful support team. Will definitely order again!",
            "author_name": "Emily Chen",
            "author_title": "Full-Time Van Lifer",
            "verified": false
          }
        }
      ]
    }
  ]
}
{% endschema %}
```

**Apply classes dynamically:**
```liquid
<section class="testimonials-section testimonials-section--{{ section.settings.style }}">
```

**✅ Checkpoint:** Section settings configured.

---

### Step 11.8: Test Testimonials Section on Mobile

**Testing Steps:**

1. **Push changes to development theme:**
   ```bash
   shopify theme push
   ```

2. **Test on multiple screen sizes:**
   - iPhone SE (375px) - Compact view
   - Standard mobile (390px-768px) - Standard view
   - Tablet (768px+) - May show multiple columns

3. **Check testimonials section specifically:**

   **Visual Tests:**
   - [ ] Testimonials stack vertically
   - [ ] Cards have comfortable padding
   - [ ] Star ratings display correctly
   - [ ] Author photos are circular and sized properly
   - [ ] Quote text is readable with good line height
   - [ ] Author information is clearly visible
   - [ ] Spacing between cards is comfortable

   **Layout Tests:**
   - [ ] No horizontal scrolling
   - [ ] Cards don't feel cramped
   - [ ] Author photo aligns with text
   - [ ] Star rating positions correctly
   - [ ] Verified badge displays (if present)
   - [ ] Date aligns properly

   **Content Tests:**
   - [ ] All quote text displays
   - [ ] Author names visible
   - [ ] Author titles/companies show
   - [ ] Star ratings accurate
   - [ ] Photos load correctly
   - [ ] Verified badges show correctly
   - [ ] Product mentions display (if present)

4. **Test different testimonial counts:**
   - 3 testimonials (typical)
   - 6+ testimonials (long list)
   - Single testimonial

5. **Test style variations:**
   - Default (bordered)
   - Minimal (dividers)
   - Cards (shadow)
   - Compact spacing
   - Spacious spacing
   - Highlighted (background)
   - Bordered left
   - Centered layout

6. **Test content variations:**
   - With author photos
   - Without author photos
   - With verified badges
   - Different star ratings (3-5 stars)
   - Long vs short quotes
   - With product mentions

7. **Performance check:**
   - [ ] Images lazy load
   - [ ] No layout shift
   - [ ] Smooth scrolling
   - [ ] Quick rendering

---

### Step 11.9: Common Testimonials Issues & Fixes

**Issue 1: Author photos not circular**
```css
@media (max-width: 768px) {
  .testimonial-card__photo {
    border-radius: 50% !important;
    object-fit: cover !important;
  }
}
```

**Issue 2: Star ratings not displaying correctly**
```css
@media (max-width: 768px) {
  .star-rating {
    display: flex !important;
    gap: 0.25rem !important;
  }
  
  .star-rating__star svg {
    fill: #ffc107 !important;
  }
}
```

**Issue 3: Cards not stacking vertically**
```css
@media (max-width: 768px) {
  .testimonials-section__items {
    display: flex !important;
    flex-direction: column !important;
    gap: 1.25rem !important;
  }
}
```

**Issue 4: Quote text too long, overflowing**
```css
@media (max-width: 768px) {
  .testimonial-card__quote {
    word-wrap: break-word !important;
    overflow-wrap: break-word !important;
  }
}
```

**Issue 5: Author info not aligning**
```css
@media (max-width: 768px) {
  .testimonial-card__author {
    display: flex !important;
    align-items: center !important;
    gap: 0.75rem !important;
  }
}
```

**Issue 6: Quote marks interfering with text**
```css
@media (max-width: 768px) {
  /* Remove quote marks if causing issues */
  .testimonial-card__quote::before,
  .testimonial-card__quote::after {
    content: none !important;
  }
}
```

---

### Step 11.10: Verify Testimonials Accessibility

**Accessibility Checklist:**

- [ ] **Headings**: Proper hierarchy (h2 for section, h3 if needed)
- [ ] **Star ratings**: ARIA labels for rating value
- [ ] **Author photos**: Descriptive alt text
- [ ] **Blockquotes**: Proper `<blockquote>` element
- [ ] **Author info**: Semantic HTML structure
- [ ] **Dates**: Proper `<time>` element with datetime
- [ ] **Color contrast**: Text meets 4.5:1 ratio
- [ ] **Focus states**: Visible if interactive

**Test with screen reader:**
```html
<!-- Accessible testimonial card -->
<article class="testimonial-card">
  <div class="star-rating" role="img" aria-label="Rated 5 out of 5 stars">
    <!-- Star icons with aria-hidden="true" -->
    <span class="star-rating__star" aria-hidden="true">
      <svg>...</svg>
    </span>
    <!-- Repeat for all stars -->
  </div>

  <blockquote class="testimonial-card__quote">
    {{ block.settings.quote }}
  </blockquote>

  <div class="testimonial-card__author">
    <img 
      src="{{ photo }}"
      alt="Photo of {{ author_name }}"
      class="testimonial-card__photo"
    >
    
    <div class="testimonial-card__info">
      <p class="testimonial-card__name">{{ author_name }}</p>
      <p class="testimonial-card__title">{{ author_title }}</p>
      
      {% if verified %}
        <span class="testimonial-card__verified" aria-label="Verified buyer">
          <svg aria-hidden="true">...</svg>
          Verified Buyer
        </span>
      {% endif %}
    </div>

    <time class="testimonial-card__date" datetime="{{ date }}">
      {{ date | date: '%B %d, %Y' }}
    </time>
  </div>
</article>
```

**Ensure star rating is accessible:**
```html
<div class="star-rating" role="img" aria-label="Rated {{ rating }} out of 5 stars">
  {% for i in (1..5) %}
    <span class="star-rating__star {% if i > rating %}star-rating__star--empty{% endif %}" aria-hidden="true">
      <svg viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
      </svg>
    </span>
  {% endfor %}
</div>
```

---

### Step 11.11: Document Testimonials Implementation

**What We Optimized:**

✅ **Vertical stacking** (no carousel - avoids user preference)  
✅ **Readable quote text** with proper formatting  
✅ **Author information** with photo, name, and title  
✅ **Star ratings** with accessible labels  
✅ **Verified buyer badges** to build trust  
✅ **Product mentions** to highlight specific items  
✅ **8 style variations** for different designs  
✅ **Rating summary** with average and breakdown  
✅ **Load more functionality** for large sets  
✅ **Accessible markup** with semantic HTML  
✅ **Date display** with proper time elements  

**Classes Available:**

**Styles:**
- `.testimonials-section--default` - Bordered cards
- `.testimonials-section--minimal` - Simple dividers
- `.testimonials-section--cards` - Shadow cards
- `.testimonials-section--compact` - Tighter spacing
- `.testimonials-section--spacious` - More breathing room
- `.testimonials-section--highlighted` - Background color
- `.testimonials-section--bordered-left` - Left accent stripe
- `.testimonials-section--centered` - Center-aligned content
- `.testimonials-section--large` - Bigger quote text
- `.testimonials-section--small` - Smaller quote text
- `.testimonials-section--photo-first` - Photo above quote
- `.testimonials-section--no-photos` - Text only
- `.testimonials-section--gradient` - Gradient background

**Mobile Breakpoints:**
- `768px` - Mobile testimonials styles
- `390px` - Adjusted padding and spacing

**Features:**
- Star ratings (1-5 stars)
- Author photos (48px circular)
- Verified buyer badges
- Product/service mentions
- Date display
- Rating summary display
- Rating breakdown bars
- Load more functionality

**Best Practices:**
- Vertical stacking (no carousels)
- Semantic HTML (article, blockquote, time)
- ARIA labels for star ratings
- Alt text for author photos
- Proper heading hierarchy
- Touch-friendly spacing (1.25rem gap)

---

## ✅ Phase 11 Complete - Testimonials Section Optimized!

## 🎉 ALL PHASES COMPLETE!

**Results:**
- Testimonials display in easy-to-read vertical stack
- No carousel (follows user preference for accessibility)
- Clear star ratings with proper labels
- Author information with photos and credentials
- Verified buyer badges build trust
- Multiple style variations for different needs
- Rating summary and breakdown (optional)
- Load more functionality for long lists
- Fully accessible with semantic HTML
- Optimized for mobile reading and scrolling

**Before moving to implementation:**
1. Test testimonials on various pages
2. Verify star ratings display correctly
3. Check author photos load and display
4. Test verified badges show correctly
5. Verify all style variations work
6. Test on actual mobile device
7. Test with screen reader
8. Verify date formatting

---

## 🏁 IMPLEMENTATION GUIDE COMPLETE!

**You now have comprehensive step-by-step instructions for:**

✅ **Phase 1:** Universal Mobile Optimizations (Typography, Spacing, Touch Targets, Layouts, Cards)  
✅ **Phase 2:** Hero Section Optimization  
✅ **Phase 3:** Features Section Optimization  
✅ **Phase 4:** Products Section Optimization  
✅ **Phase 5:** Collection List Section Optimization  
✅ **Phase 6:** Image With Text Section Optimization  
✅ **Phase 7:** Rich Text Section Optimization  
✅ **Phase 8:** Video Section Optimization  
✅ **Phase 9:** FAQ Section Optimization  
✅ **Phase 10:** Newsletter Section Optimization  
✅ **Phase 11:** Testimonials Section Optimization  

**Total Sections Optimized:** 11 content sections + universal optimizations  
**Estimated Total Time:** 6-8 hours (implementing all phases)  
**Total CSS Lines:** ~3,500+ lines of mobile-optimized code  
**Total Variations:** 60+ style/layout variations across all sections  

---

## Next Steps:

1. **Review the entire guide** to understand the scope
2. **Start with Phase 1** (Universal optimizations) - this creates the foundation
3. **Implement phases sequentially** - test each before moving to next
4. **Use the checkpoint system** - save and test after each step
5. **Test on real devices** - iPhone, Android, various screen sizes
6. **Backup everything** - the guide includes backup steps for safety
7. **Document your changes** - note any customizations you make

**Good luck with implementation! 🚀**

---
