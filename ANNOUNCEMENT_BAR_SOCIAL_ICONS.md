# Announcement Bar Social Icons Feature

## Overview
Added social media icon links to the announcement bar section. The social icons appear on the left side of the announcement bar and are automatically hidden on mobile/small screen layouts.

## Features Implemented

### 1. Section Settings
Added new URL input fields in the announcement bar section settings for:
- Facebook
- Instagram
- YouTube
- TikTok
- Twitter (X)
- LinkedIn

### 2. Design & Layout
- **Desktop (≥750px):** Social icons display on the left side of the announcement bar
- **Mobile (<750px):** Social icons are hidden
- **Positioning:** Absolute positioning at center-left, ensuring announcement text remains centered
- **Styling:** Icons match the announcement bar's color scheme (--cvc-yellow)
- **Hover Effect:** 0.7 opacity on hover for visual feedback

### 3. Icon System
- Uses the existing theme icon system (`snippets/icon.liquid`)
- Supports SVG icons for all configured social platforms
- Accessible with proper ARIA labels
- Icons open in new tabs with proper security attributes (target="_blank" rel="noopener noreferrer")

## How to Use

### For Users (Shopify Admin):
1. Go to **Theme Customizer**
2. Navigate to the **Header > Announcement Bar** section
3. Under **Social Media Links**, add URLs for your social media profiles:
   - Enter the full URL (e.g., https://facebook.com/yourpage)
   - Only filled URLs will display as icons
   - Icons appear automatically when URLs are added

### For Developers:

#### File Modified:
- `sections/header-announcements.liquid`

#### Key Changes:
1. **Schema Settings:** Added 6 URL fields for social media platforms
2. **Liquid Logic:** Checks for non-empty URLs and renders corresponding icons
3. **CSS Styling:** 
   - `.announcement-social-icons` - Container with absolute positioning
   - `.announcement-social-icons__link` - Individual icon link styling
   - `.announcement-social-icons__icon` - SVG icon styling
   - `.announcement-social-icons__label` - Visually hidden label for accessibility

#### CSS Variables Used:
- `--gap-xs` (default: 8px) - Gap between icons
- `--spacing-inline` (default: 16px) - Left offset from container
- `--icon-size-xs` (default: 16px) - Icon size
- `--cvc-yellow` - Icon color

#### Adding More Social Platforms:
To add additional social platforms:

1. Add the URL setting in the schema:
```json
{
  "type": "url",
  "id": "platform_url",
  "label": "Platform Name"
}
```

2. Update the `social_links` array in the Liquid code:
```liquid
assign social_links = 'facebook_url,instagram_url,...,new_platform_url' | split: ','
```

3. Add the platform mapping in the case statement:
```liquid
when 'new_platform_url'
  assign platform = 'platform_name'
```

4. Ensure the icon exists in `snippets/icon.liquid` with the same name

## Technical Details

### Positioning Strategy
- Social icons use `position: absolute` with `left: var(--spacing-inline)`
- Transform: `translateY(-50%)` for vertical centering
- Z-index: 1 to appear above other elements
- Announcement text remains centered using existing `.announcement-bar__slides` centering

### Responsive Behavior
- Uses `display: none` on mobile
- Shows `display: flex` on screens ≥750px
- Does not affect the layout flow of announcement text

### Accessibility
- Each icon has an `aria-label` with the platform name
- Visually hidden text label for screen readers
- Proper focus states inherited from link styling
- `aria-hidden="true"` on decorative SVG

### Performance
- No additional JavaScript required
- Uses existing icon rendering system
- Icons only render when URLs are provided
- Minimal CSS footprint

## Browser Support
Works on all modern browsers supporting:
- CSS Grid
- CSS Custom Properties (variables)
- Flexbox
- Media Queries

## Testing Checklist
- [x] Icons display correctly on desktop (≥750px)
- [x] Icons hidden on mobile (<750px)
- [x] Announcement text remains centered
- [x] Icons positioned to the left
- [x] Hover states work
- [x] Links open in new tab
- [x] Accessible via keyboard
- [x] Screen reader friendly
- [x] Empty URLs don't create broken links
- [x] Multiple icons display with proper spacing
- [x] Works with slideshow arrows present
- [x] Compatible with existing announcement bar functionality

## Future Enhancements (Optional)
1. Add more social platforms (Pinterest, Snapchat, Tumblr, Vimeo, etc.)
2. Allow users to upload custom icons
3. Configurable icon size via section settings
4. Optional mobile display with toggle setting
5. Configurable icon color independent of announcement bar
6. Animation effects on icon appearance
