---
name: Obsidian Monochrome White & Subtle Violet
description: Modern minimalist bio profile with interactive white square grid, 3D parallax tilt cards, and crisp stark white typography
colors:
  bg-base: "#070709"
  surface-card: "#0b0b10"
  border-subtle: "rgba(255, 255, 255, 0.1)"
  border-white-hover: "rgba(255, 255, 255, 0.4)"
  text-primary: "#ffffff"
  text-secondary: "#d4d4d8"
  text-muted: "#a1a1aa"
  accent-violet: "#a855f7"
  grid-hover: "rgba(255, 255, 255, 0.16)"
  indicator-online: "#10b981"
typography:
  display:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  body:
    fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif"
    fontSize: "0.9375rem"
    fontWeight: 400
    lineHeight: 1.6
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
components:
  card:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: "16px"
---

# Design System: Obsidian Monochrome White & Subtle Violet

## Overview
A pristine minimalist bio profile built on a deep obsidian foundation (`#070709`), featuring a responsive interactive square grid that illuminates white when hovered, crisp white typography and borders, accompanied by refined 3D parallax tilt cards.

## Colors
- **Ground / Base Background**: `#070709` deep black with an interactive square grid overlay.
- **Grid Hover Light**: White cells (`rgba(255, 255, 255, 0.16)` fill, `rgba(255, 255, 255, 0.7)` stroke) smoothly decaying.
- **Card Surface**: Deep glass `#0b0b10` at 92% opacity with heavy backdrop blur.
- **Typography Colors**:
  - Primary Titles & Headers: Pure crisp white `#ffffff`.
  - Body Description: `#d4d4d8` (zinc-300).
  - Subtle Accent: `#a855f7` reserved for the handle and subtle sparkles.
- **Card States**:
  - Resting: `border border-white/10`.
  - Hover: `border-white/40` with white diffuse shadow (`shadow-[0_12px_36px_rgba(255,255,255,0.08)]`).
  - Icon Hover: High-contrast white inversion (`bg-white text-black`).

## Typography
- **Primary Typeface**: `Plus Jakarta Sans` with balanced weights and high-contrast legibility.

## Layout & Motion
- **Interactive Grid**: High performance HTML5 Canvas grid (38px cells) tracking mouse movements, casting white glow footprints that trail and fade out.
- **3D Parallax Tilt**: Tactile card tilts responding to cursor angle with spring physics (`rotateX`, `rotateY`).
- **Dynamic Specular Glare**: Crisp white light reflection traveling across card glass surfaces.
