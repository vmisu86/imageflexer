# Imageflexer

Browser-based image utility for converting, resizing, and batch-processing pictures with instant previews and client-side downloads. Built with Angular 20 and Ng Zorro.

## Feature Snapshot
| Area | What you get |
| --- | --- |
| Batch Studio | Convert/resize many images at once with side-by-side cards, live progress, and success/failure summaries |
| Converter & Resizer | JPG/PNG/WebP/AVIF with quality control; presets or custom dimensions; optional aspect lock |
| Uploads | Drag-and-drop with type/size validation, keyboard-accessible dropzone, lazy-loaded previews |
| Results | Grid/list toggle, per-file downloads, Download All as zip, saved history (optional) |
| Personalization | Light/dark themes, saved defaults (format, quality, upload limits), clear-all controls |

## Stack & Scripts
| Category | Details |
| --- | --- |
| Framework | Angular 20, TypeScript, Ng Zorro (Ant Design), LESS, RxJS |
| Assets | JSZip (zip downloads), Canvas API (processing) |
| Scripts | `npm start` (dev), `npm run build:prod` (prod build), `npm test` (Karma/Jasmine) |

## Quickstart
1) `npm install`  
2) `npm start` → open `http://localhost:4200/`  
3) Build: `npm run build:prod`  
4) Tests: `npm test`

## How to Use
- Pick a tool (Batch Studio, Converter, Resizer) from the header/drawer.
- Drop or select images; set format/quality and/or dimensions.
- Click Process; track progress; download singles or “Download All” for a zip.
- Settings (gear icon): adjust defaults, upload cap, history limit, theme; clear saved data.

## Architecture Overview
```
src/
├─ app/
│  ├─ core/               # services (image, storage, theme) + models
│  ├─ shared/             # dropzone, preview, settings, directives, pipes, Ng Zorro exports
│  ├─ features/           # batch (Batch Studio), converter, resizer (lazy-loaded)
│  ├─ layout/             # header/footer shell and navigation
│  ├─ app.config.ts       # providers, icons, i18n, router
│  └─ app.routes.ts       # routes default to Batch Studio
└─ assets/styles/         # LESS variables, mixins, light/dark themes
```

## Notes
- Processing is 100% in-browser via the Canvas API; very large images can hit memory limits despite the 50 MB default upload cap.
- Processed images and settings live in `localStorage`; clear them from the settings panel if needed.
