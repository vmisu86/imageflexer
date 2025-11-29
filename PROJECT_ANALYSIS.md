# ImageFlexer – Project Analysis

## Overview
- Browser-based image utility built with Angular 19 and Ng Zorro for UI.
- Supports converting, resizing, and batch processing images entirely client-side via the Canvas API; no backend dependencies.
- Persists user preferences and processed image history in `localStorage`, with optional dark mode.

## Architecture
- **Routing/Layout:** Standalone root component with Ng Zorro layout shell (header/nav, content, footer). Routes are lazy-loaded for `converter`, `resizer`, and `batch` features; default route points to the batch processor.
- **Modules:** Feature modules for each tool (`features/*`) and a `SharedModule` packaging reusable UI (file dropzone, image preview, settings panel), directives (drag-drop), pipes (file-size), and Ng Zorro imports.
- **Core services/models:** 
  - `ImageService` orchestrates processing with `BehaviorSubject` state for `processedImages$` and `processing$`, performs resize/convert via canvas, and optionally zips downloads using dynamic `jszip` import.
  - `StorageService` namespaces `localStorage` operations and exposes convenience methods plus app-settings helpers.
  - `ThemeService` reads persisted or system theme preference, toggles body class, and exposes a `BehaviorSubject` stream.
  - Models define `AppSettings` defaults and `ImageConfig` / `ProcessedImage` shapes.
- **Styling/Theming:** LESS variables/mixins with `assets/styles/themes/*` for light/dark; theme toggling applies `dark-theme` class on `<body>`.

## Key Flows
- **File intake:** `FileDropzoneComponent` validates file type/size, supports drag-and-drop or picker, emits file lists, and maintains preview URLs (cleaned up on destroy); OnPush change detection plus manual marks.
- **Processing pipeline:** Feature components build an `ImageConfig` (format/quality, max dimensions, aspect behavior). `processBatch` loops files, calling `processImage` to resize+convert, then updates `processedImages$`, persists results, and surfaces per-file errors in console while continuing.
- **Downloads:** Single downloads use anchor blobs; bulk download attempts ZIP creation, falling back to individual downloads on failure.
- **Settings & persistence:** Settings panel reads/saves defaults (format, quality, max upload size, history, theme) via `StorageService`; “clear all data” clears prefixed `localStorage` entries and reloads. Processed images/history persistence is guarded by a max upload size default (50 MB).
- **Theming:** Header toggle flips `ThemeService` state; system preference is observed when “remember settings” is off.

## Notable Behaviors / Risks
- Canvas operations happen entirely in-browser; very large images can hit memory limits despite the 50 MB guard.
- Processed image history in `localStorage` can grow; storage quota may be exceeded if many images are retained.
- Some preset labels in the resizer use non-ASCII glyphs (e.g., “1280Į-720”) which might be unintended.

## Tooling & Scripts
- `npm start` / `ng serve` for dev; `npm run build` (dev) and `npm run build:prod` (prod config); `npm test` for Karma/Jasmine.
