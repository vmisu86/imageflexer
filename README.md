# Imageflexer

Browser-based image utility for converting, resizing, and batch-processing pictures with instant previews and client-side downloads. Built with Angular 20 and Ng Zorro.

## Features
- **Batch Studio first:** Process many images at once with side-by-side convert/resize cards, live progress, and success/failure summaries.
- **Converters & resizer:** Convert JPG/PNG/WebP/AVIF with quality control; resize via presets or custom dimensions while optionally preserving aspect ratio.
- **Friendly uploads:** Drag-and-drop with type/size validation, keyboard-accessible dropzone, and lazy-loaded previews.
- **Flexible results:** Toggle grid/list views, download singles or all-as-zip, and keep a history of processed files (optional).
- **Personalization:** Light/dark themes, saved defaults (format, quality, upload limits), and clear-all controls.

## Tech Stack
- Angular 20, TypeScript, Ng Zorro (Ant Design), LESS, JSZip, RxJS.

## Getting Started
1) Install dependencies: `npm install`
2) Start dev server: `npm start` then open `http://localhost:4200/`
3) Production build: `npm run build:prod`
4) Tests: `npm test` (Karma/Jasmine)

## Usage
- Choose a tool (Batch Studio, Converter, Resizer) from the header/drawer.
- Drop or select images; set format/quality and/or dimensions.
- Click Process; monitor progress; download individual files or “Download All” for a zip.
- Open the settings panel (gear icon) to tune defaults, toggle dark mode, or clear saved data.

## Project Structure (high level)
- `src/app/core` – services (image processing, storage, theme) and models for settings/config.
- `src/app/shared` – reusable components (dropzone, preview, settings), directives, pipes, Ng Zorro exports.
- `src/app/features` – lazy-loaded Batch Studio, Converter, Resizer modules/components.
- `src/app/layout` – header/footer shell and navigation.
- `src/assets/styles` – LESS variables, mixins, and light/dark theme definitions.

## Notes
- All processing runs in-browser via the Canvas API; very large images can hit memory limits despite the 50 MB default upload cap.
- Processed images and settings live in `localStorage`; clear them from the settings panel if needed.
