export interface ImageConfig {
    maxWidth?: number;
    maxHeight?: number;
    quality?: number;
    format?: 'image/jpeg' | 'image/png' | 'image/webp' | 'image/avif';
    preserveAspectRatio?: boolean;
    filename?: string;
}

export interface ProcessedImage {
    dataUrl: string;
    file: File;
    originalSize: number;
    newSize: number;
    width: number;
    height: number;
    format: string;
}