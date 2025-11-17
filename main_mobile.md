# Main Content Mobile Optimization Guide

## Overview
This guide provides mobile-first optimization strategies for all main content sections in `sections/main-page.liquid`. Each section has specific mobile challenges and opportunities for improvement.

---

## Section Analysis & Optimization Options

### 1. Hero Section (`cvc-hero`)
**Current Mobile Issues:**
- Large padding may waste vertical space
- Background images may not be optimized for mobile
- Text sizes might not scale well on small screens

**Optimization Options:**

#### Option A: Compact Mobile Hero (Recommended)
- Reduce vertical padding (3rem → 2rem top, 2rem → 1.5rem bottom)
- Optimize heading sizes (h1: 2rem → 1.75rem on < 390px)
- Ensure background images use mobile-optimized versions
- Stack elements vertically with tighter spacing
- Adjust button sizes for better touch targets

#### Option B: Full-Bleed Mobile Hero
- Remove side padding completely on mobile
- Use viewport-height based sizing (50vh min-height)
- Overlay text with gradient background for readability
- Center all content with minimal padding

#### Option C: Image-First Mobile Hero
- Show image first, content below
- Remove background image on mobile, use inline image
- Better performance and clearer content hierarchy

---

### 2. Features Section (`cvc-features`)
**Current Mobile Issues:**
- Grid layout (3 columns) doesn't adapt well to narrow screens
- Icons and text may be cramped
- Spacing between features needs optimization

**Optimization Options:**

#### Option A: Single Column Stack (Recommended)
- Convert 3-column grid to single column on mobile
- Full-width feature cards with comfortable padding
- Icon size: 48px (currently 64px)
- Centered layout for better readability
- Reduced gap between items (1.5rem)

#### Option B: Two-Column Compact Grid
- 2-column grid on mobile (390px+)
- Single column on extra small screens (< 390px)
- Smaller icons (40px) to fit two columns
- Tighter spacing for efficiency

#### Option C: Horizontal Scroll Cards
- Swipeable horizontal scrolling cards
- Each feature is a card in horizontal scroll
- Good for many features, maintains visual hierarchy
- Snap scrolling for better UX

---

### 3. Image With Text Section (`cvc-image-text`)
**Current Mobile Issues:**
- Side-by-side layout wastes space on mobile
- Images too large or too small
- Text might be hard to read
- Padding/spacing not optimized

**Optimization Options:**

#### Option A: Image-First Stack (Recommended)
- Stack image on top, content below
- Full-width image (edge-to-edge or with minimal padding)
- Comfortable text padding (1.25rem sides)
- Optimized image height (250px-300px)
- Reverse stack option for alternating layouts

#### Option B: Compact Stack with Small Image
- Smaller image (200px height)
- More focus on text content
- Good for text-heavy sections
- Faster loading

#### Option C: Background Image with Overlay
- Image as background
- Text overlaid with semi-transparent background
- More compact, dramatic effect
- Ensure contrast for readability

---

### 4. Products Section (`cvc-products`)
**Current Mobile Issues:**
- 4-column grid too cramped on mobile
- Product cards need better touch targets
- Images might be too small
- Pricing and buttons need optimization

**Optimization Options:**

#### Option A: Two-Column Mobile Grid (Recommended)
- 2 products per row on mobile (390px+)
- Single column on extra small (< 390px)
- Larger product images for better visibility
- Comfortable padding around cards (0.75rem gap)
- Touch-friendly quick-add buttons

#### Option B: Single Column with Larger Images
- One product per row
- Full-width product cards
- Larger images (300px height)
- More prominent CTAs
- Better for featured collections

#### Option C: Horizontal Scroll Products
- Horizontal scrolling product carousel
- 1.5 products visible at a time
- Swipe to browse
- Good for "you might also like" sections
- Snap scrolling

---

### 5. Collection List Section (`cvc-collection-list`)
**Current Mobile Issues:**
- Grid layout might show too many/too few items
- Collection images need optimization
- Touch targets for collection links

**Optimization Options:**

#### Option A: Two-Column Collection Grid (Recommended)
- 2 collections per row on mobile
- Square collection images (aspect-ratio: 1/1)
- Collection titles below images
- Comfortable gap (1rem)
- Easy thumb-tap navigation

#### Option B: Single Column Large Cards
- One collection per row
- Larger, more prominent collection images
- More space for descriptions
- Better for fewer, featured collections

#### Option C: Scrollable Collection Row
- Horizontal scroll with collection cards
- 2.5 collections visible
- Swipe to browse
- Compact, browse-friendly

---

### 6. Video Section (`cvc-video`)
**Current Mobile Issues:**
- Video player controls might be hard to use
- Aspect ratio issues on narrow screens
- Autoplay/data usage concerns
- Padding/sizing optimization

**Optimization Options:**

#### Option A: Responsive 16:9 Video (Recommended)
- Maintain 16:9 aspect ratio
- Full-width container with minimal padding (0.5rem sides)
- Native controls optimized for touch
- Lazy loading for better performance
- Poster image optimization

#### Option B: Compact Square Video
- 1:1 aspect ratio for mobile
- Saves vertical space
- Good for short clips
- Better for small screens

#### Option C: Thumbnail with Play Button
- Show poster image only
- Large play button overlay
- Video loads on tap (saves data)
- Full-screen playback option

---

### 7. Testimonials Section (`cvc-testimonials`)
**Current Mobile Issues:**
- Multiple testimonials side-by-side cramped
- Text sizes need optimization
- Star ratings might be too small
- Author info layout

**Optimization Options:**

#### Option A: Single Column Carousel (Recommended)
- One testimonial visible at a time
- Swipe to navigate between testimonials
- Dots/indicators for navigation
- Larger, more readable text
- Comfortable padding (1.5rem)

#### Option B: Compact Stacked List
- Stack all testimonials vertically
- Reduced padding for efficiency
- Smaller star ratings (16px stars)
- Scrollable if many testimonials

#### Option C: Card-Based Carousel
- Card-style testimonials
- Swipe navigation
- Peek at next/previous cards
- Modern, app-like feel

---

### 8. FAQ Section (`cvc-faq`)
**Current Mobile Issues:**
- Accordion items might be too tall/cramped
- Touch targets for expand/collapse
- Text readability in answers
- Overall spacing

**Optimization Options:**

#### Option A: Full-Width Accordions (Recommended)
- Full-width accordion items
- Larger touch targets (min 44px height)
- Clear expand/collapse icons (+/-)
- Comfortable padding (1rem inside items)
- Smooth expand/collapse animation
- Only one item open at a time

#### Option B: Compact FAQ List
- Smaller accordion items
- Reduced padding (0.75rem)
- Fit more questions on screen
- Good for long FAQ lists

#### Option C: Tab-Based FAQ Categories
- Tab navigation for FAQ categories
- Accordions within each tab
- Organize many FAQs better
- Swipeable tabs

---

### 9. Newsletter Section (`cvc-newsletter`)
**Current Mobile Issues:**
- Form inputs might be too small
- Button sizing/touch targets
- Layout of email + button
- Overall spacing and padding

**Optimization Options:**

#### Option A: Stacked Form (Recommended)
- Email input full width
- Submit button full width below input
- Large touch targets (min 48px height)
- Comfortable spacing (1rem between elements)
- Clear focus states
- Prominent, easy to use

#### Option B: Inline Compact Form
- Email and button in one row
- Input takes 70% width, button 30%
- Smaller form factor
- Good for footer newsletters

#### Option C: Minimalist Form
- Email input only (button inside input)
- Floating label
- Modern, clean design
- Space-efficient

---

### 10. Rich Text Section (`cvc-rich-text`)
**Current Mobile Issues:**
- Paragraph text might be too wide
- Heading sizes not optimized
- Line height and readability
- Link and button styling

**Optimization Options:**

#### Option A: Optimized Reading Experience (Recommended)
- Max-width for paragraphs (600px)
- Reduced heading sizes (h2: 1.75rem, h3: 1.5rem)
- Increased line height (1.6-1.8)
- Comfortable padding (1.25rem sides)
- Larger tap targets for links (underline + padding)
- Better readability overall

#### Option B: Compact Text Block
- Smaller font sizes (0.9rem)
- Tighter line height (1.5)
- Fit more content on screen
- Good for dense information

#### Option C: Card-Based Text
- Text in card containers
- Background color for distinction
- Padding around content
- Better visual hierarchy

---

### 11. Custom Liquid Section (`cvc-custom-liquid`)
**Current Mobile Issues:**
- Custom code might not be responsive
- Unknown mobile behavior
- Potential layout breaks

**Optimization Options:**

#### Option A: Mobile-First Container (Recommended)
- Wrap content in mobile-optimized container
- Max-width constraints
- Responsive padding (1rem → 1.25rem)
- Overflow handling
- Flexible for any custom content

#### Option B: Hide on Mobile
- Option to hide section entirely on mobile
- Good for desktop-only features
- Clean mobile experience

#### Option C: Mobile-Specific Version
- Allow separate mobile/desktop liquid code
- Complete control
- Different layouts for different screens

---

## Global Mobile Optimizations

### Typography Scale
```
Extra Small (< 390px):
- h1: 1.75rem
- h2: 1.5rem
- h3: 1.25rem
- body: 0.9rem

Small (390px - 768px):
- h1: 2rem
- h2: 1.75rem
- h3: 1.5rem
- body: 1rem
```

### Spacing Scale
```
Extra Small (< 390px):
- Section padding: 2rem 1rem
- Item gap: 0.75rem
- Card padding: 0.75rem

Small (390px - 768px):
- Section padding: 2.5rem 1.25rem
- Item gap: 1rem
- Card padding: 1rem
```

### Touch Targets
```
Minimum touch target: 44px × 44px
Recommended: 48px × 48px
Buttons: Full width or min 120px wide
Links: Adequate padding around text
```

---

## Implementation Approach

### Phase-Based Implementation (Recommended)
1. **Phase 1**: Global optimizations (typography, spacing, touch targets)
2. **Phase 2**: Hero + Features (above-the-fold priority)
3. **Phase 3**: Products + Collections (commerce priority)
4. **Phase 4**: Content sections (image-text, rich text, video)
5. **Phase 5**: Engagement sections (testimonials, FAQ, newsletter)
6. **Phase 6**: Custom sections
7. **Phase 7**: Testing and refinement

### Section-by-Section Implementation
- Implement one section at a time
- Test each section before moving on
- Allows for easier debugging
- More control over changes

---

## Testing Requirements

### Devices to Test
- iPhone SE (375px) - Small screen
- iPhone 12/13/14 (390px) - Standard
- iPhone 14 Pro Max (430px) - Large
- Small Android (360px) - Extra small
- Tablet (768px+) - Responsive breakpoint

### What to Test
- ✅ Layout doesn't break
- ✅ All text is readable
- ✅ Touch targets are adequate (min 44px)
- ✅ Images load and display correctly
- ✅ Forms are usable
- ✅ Buttons work and are visible
- ✅ No horizontal scrolling
- ✅ Performance is acceptable

---

## Recommendation Summary

**Quick Wins** (High impact, low effort):
1. Hero - Option A (Compact Mobile Hero)
2. Features - Option A (Single Column Stack)
3. Products - Option A (Two-Column Grid)
4. Rich Text - Option A (Optimized Reading)
5. Newsletter - Option A (Stacked Form)

**Medium Effort** (Good improvements):
6. Image-Text - Option A (Image-First Stack)
7. FAQ - Option A (Full-Width Accordions)
8. Collection List - Option A (Two-Column Grid)

**Consider Later** (More complex):
9. Testimonials - Option A (Carousel)
10. Video - Option A (Responsive 16:9)

---

## Next Steps

1. **Review this document** and choose preferred options for each section
2. **Prioritize sections** based on business needs (e.g., products first)
3. **Implement phase-by-phase** starting with highest priority
4. **Test thoroughly** on real devices after each phase
5. **Iterate and refine** based on user feedback

---

**Questions to Consider:**
- Which sections are most important to your users on mobile?
- Do you prefer efficiency (compact) or readability (spacious)?
- Are you willing to use carousels/horizontal scrolling?
- Should we maintain desktop parity or create unique mobile experiences?