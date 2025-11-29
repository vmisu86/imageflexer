# ImageFlexer – Project Analysis

## Overview
- Front-end only image utility (Angular 20 + Ng Zorro) that converts, resizes, and batch-processes images entirely in the browser via the Canvas API.
- Batch-first experience (“Batch Studio”) with progress feedback, summaries, and flexible result views; no backend required.
- Persists user preferences and processed image history in `localStorage`, with dark/light theme support.

## Architecture
- **Routing/Layout:** Standalone root with Ng Zorro layout; lazy-loaded feature routes (`/batch`, `/converter`, `/resizer`). Default landing is Batch Studio. Header/drawer navigation with theme toggle and settings.
- **Modules:** Feature modules per tool (`features/*`) and a `SharedModule` bundling reusable components (dropzone, previews, settings), directives (drag-drop), pipes (file-size), and Ng Zorro exports.
- **Core services/models:**  
  - `ImageService` handles resize/convert via canvas, tracks processing/progress streams, and zips downloads with dynamic `jszip` import.  
  - `StorageService` prefixes and manages `localStorage` for history/settings.  
  - `ThemeService` reads stored/system preference and toggles a body class.  
  - Models describe app settings, image configs, processed images, batch results/progress.
- **Styling/Theming:** LESS variables/mixins and theme files (`assets/styles/themes/*`); `dark-theme` body class controls mode.

## Key Flows
- **File intake:** `FileDropzoneComponent` validates type/size, supports drag/drop and picker, emits files, tracks previews (cleaned up on destroy), and is keyboard-accessible (focus/Enter/Space).
- **Processing pipeline:** Feature components build an `ImageConfig`; `processBatch` loops files, updates progress, persists successes, and records per-file failures while continuing.
- **Downloads:** Single-file download via blob links; bulk download via ZIP with fallback to individual downloads on error.
- **Results display:** `ImagePreviewComponent` offers grid/list modes, lazy-loaded thumbnails, saving badges, and detail modal; shows processed/failed summary chips.
- **Settings & persistence:** Drawer-based panel for format/quality defaults, upload caps, history limit, theme, and clear-all (prefixed storage wipe + reload).

## Notable Behaviors / Risks
- Large images can exceed memory/Canvas limits despite the 50 MB default upload guard.
- Persisted history can grow and hit `localStorage` quota if not cleared.
- jszip ships as CommonJS, triggering an optimization warning (can be whitelisted).

## Tooling & Scripts
- Dev: `npm start` / `ng serve`
- Build: `npm run build` (dev), `npm run build:prod` (prod config)
- Tests: `npm test` (Karma/Jasmine)
