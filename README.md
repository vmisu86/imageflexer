# Imageflexer

Browser-based image utility for converting, resizing, and batch-processing pictures with instant previews and client-side downloads. Built with Angular 19 and Ng Zorro.

## Features
- Convert between JPG/PNG/WebP/AVIF with adjustable quality.
- Resize with presets or custom dimensions; optional aspect ratio preservation.
- Batch mode to mix resize/convert operations and zip all results.
- Drag-and-drop upload with file-type/size validation and inline previews.
- Download singles or all-as-zip; remembers processed images and user settings (optional).
- Light/dark themes with system-preference support.

## Tech Stack
- Angular 19, TypeScript, Ng Zorro (Ant Design), LESS, JSZip, RxJS.

## Getting Started
1) Install dependencies: `npm install`
2) Run the dev server: `npm start` then open `http://localhost:4200/`
3) Production build: `npm run build:prod`
4) Tests (Karma/Jasmine): `npm test`

## Usage
- Pick a tool from the header (Converter, Resizer, Batch Processor).
- Drop or select images in the dropzone; adjust format/quality or dimensions as needed.
- Click the action button to process; use the preview list to download individual files or “Download All” to get a zip.
- Open the settings panel (gear icon) to change defaults (format, quality, max upload size, history), toggle dark mode, or clear saved data.

## Project Structure (high level)
- `src/app/core` – services (image processing, storage, theme) and models for settings/config.
- `src/app/shared` – reusable components (file dropzone, image preview, settings panel), directives, pipes, and Ng Zorro exports.
- `src/app/features` – lazy-loaded Converter, Resizer, and Batch Processor modules/components.
- `src/app/layout` – header/sidebar/footer shell and navigation.
- `src/assets/styles` – LESS variables, mixins, and light/dark theme definitions.

## Notes
- Processing happens entirely in the browser via the Canvas API; very large images may hit memory limits despite the 50 MB default upload cap.
- Processed images and settings are stored in `localStorage`; clear them from the settings panel if needed.
