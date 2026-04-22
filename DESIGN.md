---
version: alpha
name: Quiet Techno Swiss
description: A light, restrained fusion of neo-swiss editorial clarity and techno brutalist precision.
colors:
  primary: "#101214"
  secondary: "#4F5B66"
  tertiary: "#246BFD"
  neutral: "#F7F6F2"
  surface: "#FFFFFF"
  surface-alt: "#EEF2F6"
  border: "#D6DDE5"
  highlight: "#DCE7FF"
  success: "#1F8F5F"
  warning: "#C58A12"
  danger: "#C94949"
typography:
  display-xl:
    fontFamily: Inter
    fontSize: 64px
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: -0.04em
  headline-lg:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: 650
    lineHeight: 1.02
    letterSpacing: -0.03em
  headline-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.08
    letterSpacing: -0.02em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: -0.01em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  label-md:
    fontFamily: Space Grotesk
    fontSize: 13px
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: 0.08em
  label-sm:
    fontFamily: Space Grotesk
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1
    letterSpacing: 0.12em
rounded:
  none: 0px
  sm: 4px
  md: 8px
  lg: 12px
  xl: 18px
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  xxl: 64px
  gutter: 24px
  margin: 32px
  maxWidth: 1200
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    borderColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    paddingX: "20px"
    paddingY: "12px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    borderColor: "{colors.border}"
    rounded: "{rounded.sm}"
    paddingX: "20px"
    paddingY: "12px"
  card-default:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.border}"
    rounded: "{rounded.md}"
    padding: "{spacing.lg}"
  input-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    borderColor: "{colors.border}"
    rounded: "{rounded.sm}"
    paddingX: "16px"
    paddingY: "12px"
  badge-data:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.primary}"
    borderColor: "{colors.border}"
    rounded: "{rounded.full}"
    paddingX: "10px"
    paddingY: "6px"
---

## Overview
A restrained blend of neo-swiss editorial order and techno brutalist system energy.

The interface should feel precise, modern, and designed for serious work, but never cold or visually overloaded. It should use a disciplined grid, strong typography, and visible structure, while keeping the screen breathable and light. The mood is clean and intelligent first, technical second. Think editorial rigor with subtle operational DNA.

This system avoids the usual extremes of brutalism. It should not feel aggressive, noisy, glitchy, or crowded. It should also avoid feeling too soft, decorative, or startup-generic. The result should be calm, sharp, and slightly futuristic.

## Colors
The palette is predominantly light and neutral, with strong contrast reserved for text, key frames, and primary actions.

- **Primary (#101214):** Deep graphite used for primary text, bold headings, key dividers, and strong action surfaces.
- **Secondary (#4F5B66):** Muted steel used for metadata, secondary labels, helper text, and less prominent interface lines.
- **Tertiary (#246BFD):** Electric but controlled blue used as the single main accent for interaction, selection, and active system states.
- **Neutral (#F7F6F2):** Warm paper-like page background. Prefer this over pure white for large surfaces.
- **Surface (#FFFFFF):** Clean foreground plane for cards, forms, panels, and content blocks.
- **Surface Alt (#EEF2F6):** Quiet technical fill used for chips, tables, highlighted rows, and inactive controls.
- **Border (#D6DDE5):** Low-noise structural border color used to define layout without heavy visual weight.
- **Highlight (#DCE7FF):** Selection wash for active states, focus areas, and restrained callouts.

Use accent color intentionally. Most of the screen should be neutral, typographic, and structural. Color should guide action, not decorate the page.

## Typography
Typography is the main source of identity. It should carry the elegance of neo-swiss systems while borrowing a slight instrument-panel attitude from techno brutalism.

- **Display and Headline styles:** Use Inter with tight spacing and assertive weights. Headlines should be crisp and editorial, not theatrical.
- **Body styles:** Use Inter for all primary reading experiences. Body text should stay highly legible and calm.
- **Label styles:** Use Space Grotesk only for metadata, tags, section markers, tabs, KPI labels, timestamps, and compact technical UI. Labels may be uppercase when they help introduce a system-like tone.

Type hierarchy should do most of the work. Avoid oversized decorative headings unless they anchor an important hero area. Prefer fewer type sizes used consistently over many expressive variations.

## Layout
The layout should follow a strict grid with generous whitespace and limited simultaneous focal points.

Use a fixed max-width desktop frame around 1200px with consistent margins and gutters. Mobile layouts should stack cleanly without losing hierarchy.

Pages should feel sparse but intentional. Each screen should have one dominant goal, one support area, and a small number of clearly grouped secondary elements. Avoid dashboards that try to show everything at once.

Spacing should follow a disciplined 8px rhythm with 4px used only for fine adjustments. Sections need breathing room. Cards and modules should align hard to the grid. Asymmetry is allowed when it feels editorial and balanced, not chaotic.

Full-width dividers should be rare. Do not use horizontal rules as the default way to separate major sections. Prefer hierarchy through typography, spacing, alignment, and content framing first. When boundaries are still needed, prefer local grid structure or card edges over page-wide separator lines.

## Elevation & Depth
Depth should be subtle.

This system does not rely on heavy shadows, glass effects, or layered visual spectacle. Hierarchy should come primarily from contrast, borders, spacing, and containment.

Use very soft shadows only when needed to separate floating UI such as command palettes, dropdowns, or sticky toolbars. Most cards should feel flat but precise, using light surfaces and clear outlines rather than dramatic lift.

## Shapes
The shape language should be mostly rectilinear with small, controlled rounding.

Buttons, fields, cards, and panels should feel engineered, not playful. Prefer 4px to 8px radii for most components. Larger radii may be used sparingly for pills, badges, or selected filters.

Avoid bubbly or overly rounded forms. Avoid jagged brutality too. The geometry should feel disciplined, confident, and quietly technical.

## Components
Components should merge editorial clarity with system framing.

- **Buttons:** Primary buttons use dark fill or the accent blue, with high contrast text and compact, confident padding. Secondary buttons use white or pale surfaces with explicit borders.
- **Cards:** Cards should be light, structured, and useful for grouping content. Use borders, padding, and typography to create hierarchy before resorting to color.
- **Navigation:** Navigation should be minimal and crisp. Prefer line-based separators, strong active states, and clear tab markers over decorative fills.
- **Section separation:** Use headlines, labels, whitespace, and editorial composition to signal shifts in content. Avoid stacking repeated divider lines throughout the page.
- **Tables and data blocks:** Keep them airy. Use subtle row dividers, restrained striping or alternate fills, and clear numeric alignment.
- **Inputs:** Inputs should feel clean and technical, with strong focus states using the tertiary accent or highlight wash.
- **Badges and labels:** These should evoke a subtle operational feel, but remain quiet. Use muted fills and compact uppercase labels rather than loud status pills.

Whenever a component choice is ambiguous, prefer the quieter option.

## Do's and Don'ts
### Do
- Use light backgrounds and quiet surfaces.
- Let typography and spacing lead the visual hierarchy.
- Keep the interface structured, grid-based, and intentional.
- Use one main accent color consistently.
- Make the product feel premium, technical, and calm.
- Allow a subtle sense of futurism through labels, data framing, and sharp composition.

### Don't
- Do not overload the screen with panels, floating widgets, or dense dashboards.
- Do not use multiple bright accent colors.
- Do not add cyberpunk glows, glitch textures, scanlines, or heavy techno clichés.
- Do not make the interface feel sterile corporate beige or generic AI SaaS.
- Do not use oversized shadows, glassmorphism, or ornamental gradients.
- Do not round everything heavily.
- Do not rely on repeated divider lines to create section hierarchy across the site.
