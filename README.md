# Super Car Showcase

## 📚 Table of Contents

* [Overview](#overview)

  * [Site Objective](#site-objective)
  * [Site Audience](#site-audience)
* [Page Structure](#page-structure)

  * [Folder Structure](#folder-structure)
  * [Page Router](#page-router)
  * [The Car Model](#the-car-model)
  * [Design Philosophy](#design-philosophy)
* [Page Design](#page-design)

  * [Start Page](#start-page)
  * [Common](#common)

    * [Header](#header)
    * [Navigation](#navigation)
    * [Footer](#footer)
  * [Featured Cars](#featured-cars)
  * [Explore Cars](#explore-cars)

    * [Select Brand](#select-brand)
    * [Select Car](#select-car)
    * [Filter Cars](#filter-cars)
  * [View Car](#view-car)

    * [Quick Navigation](#quick-navigation)
    * [Hero](#hero)
    * [Overview](#overview-section)
    * [Gallery](#gallery)
    * [Performance](#performance)
    * [Specifications](#specifications)
  * [About](#about)
  * [Sitemap](#sitemap)
* [Appendix](#appendix)
* [Sources](#sources)

---

## Overview

### Site Objective

The goal of this project was to create a modern, animated, and responsive automotive website inspired by luxury car manufacturer sites. The site uses dynamic content and accessibility-first design, focusing on supercars and their presentation.

### Site Audience

Targeted toward car enthusiasts and design researchers, the site aims to mimic the luxury feel of top-tier automotive sites with smooth transitions, rich visuals, and responsive layouts optimized for mobile and desktop devices.

---

## Page Structure

### Folder Structure

* Organized top-down from the sitemap
* Grouped pages, scripts, styles together
* Separated static assets (images, data) by type
* Enabled dynamic path resolution for routing

### Page Router

A custom page router handles all logic related to:

* Loading/unloading HTML
* Injecting page components (root, nav, footer, script)
* Sequencing via async `loadPage` and ordered insertion
* Modules expose `init` and `teardown` for state management

Inspired by Netflix’s Falcor system, this router allows scalable and flexible page management.

### The Car Model

Cars are class-based objects created from structured metadata. Each car:

* Retrieves shared brand data (logo, name, colors)
* Supports dynamic rendering in different modules
* Is read-only, ensuring data integrity across modules

This model powers Featured, Explore, and View pages.

### Design Philosophy

Key influences:

* Forza Motorsport 6 UI (initially)
* Automotive brand sites (Audi, BMW, Bugatti, Aston Martin)

Design principles:

* CSS variables for spacing, themes, transitions
* Fluid typography with `clamp()` and a dual-scale system (fluid + absolute)
* Grid-based responsive layout (4, 8, 12 cols)
* Flexbox for micro-layouts
* Relative colors using `oklab()`
* Accessibility via semantic HTML, ARIA labels, and contrast checking

Theme and layout were optimized through developer tools and browser-native features.

---

## Page Design

### Start Page

Landing page with a 15-second background carousel. Single CTA button links to Featured Cars.

### Common

#### Header

* Fixed 80px tall bar
* Displays logo and current page
* Button triggers nav panel

#### Navigation

* Opens top-down (mobile) or left slide-in (desktop)
* Separates main vs secondary links
* Integrated with page router

#### Footer

* Contains social/legal links (placeholders)
* Anchored at page bottom

### Featured Cars

* Carousel showcasing 3 random cars
* Controlled via auto interval and UI buttons
* Responsive UI adapts button position based on screen size

### Explore Cars

#### Select Brand

* Scrollable list of matching brands
* Clicking a brand filters the car list

#### Select Car

* Displays car cards matching filters and brand
* Empty state shows CTA to open filters

#### Filter Cars

* 3 filters: brand, drivetrain, price range
* Dual slider input with synced min/max
* Issues resolved for mobile (soft lock, select reset)
* Responsive behavior based on screen size

### View Car

#### Quick Navigation

* Scroll-to-section functionality
* Visibility toggled on scroll direction
* Adjusts layout responsively

#### Hero

* Displays large brand image and subtle animation
* Uses IntersectionObserver to toggle header visibility

#### Overview

* Brand story and logo
* Uses `animation-timeline: view()` for subtle motion

#### Gallery

* Interior/exterior toggle
* Intersection animation triggers

#### Performance

* Animated performance counters (Aston Martin-inspired)
* Triggered on viewport entry

#### Specifications

* Structured car spec table
* Animated ripple-on-load

### About

* Project summary and design overview
* Cleanest use of grid/flex structure

### Sitemap

* Section-by-section navigation
* View Car opens a random car

---

## Appendix

This document summarizes technical, design, and accessibility decisions made throughout the development process.

## Sources

* Car data: Official manufacturer websites
* Brand colors: Extracted via Chrome DevTools CSS Overview
* Design inspiration: Forza Motorsport 6, Bugatti, Aston Martin, Audi, BMW, Cadillac, Tesla, Volkswagen
* Accessibility formula: WCAG luminance Y = (0.2126 \* R) + (0.7152 \* G) + (0.0722 \* B)

---

Built with ❤️ by an automotive enthusiast for design exploration and inspiration.
