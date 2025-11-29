import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { BatchResult, ImageConfig, ProcessFailure, ProcessedImage } from '../models/image-config.model';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class ImageService {
    private processedImagesSubject = new BehaviorSubject<ProcessedImage[]>([]);
    public processedImages$ = this.processedImagesSubject.asObservable();

    private processingSubject = new BehaviorSubject<boolean>(false);
    public processing$ = this.processingSubject.asObservable();

    constructor(private storageService: StorageService) {
        // Load any saved images from storage
        const savedImages = this.storageService.getItem<ProcessedImage[]>('processedImages');
        if (savedImages) {
            this.processedImagesSubject.next(savedImages);
        }
    }

    /**
     * Process a single image file according to the provided configuration
     */
    async processImage(file: File, config: ImageConfig): Promise<ProcessedImage> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();

            reader.onload = (event: any) => {
                const img = new Image();

                img.onload = () => {
                    try {
                        const result = this.resizeAndConvertImage(img, file, config);
                        resolve(result);
                    } catch (error) {
                        reject(error);
                    }
                };

                img.onerror = () => {
                    reject(new Error('Failed to load image'));
                };

                img.src = event.target.result;
            };

            reader.onerror = () => {
                reject(new Error('Failed to read file'));
            };

            reader.readAsDataURL(file);
        });
    }

    /**
     * Process multiple image files in batch
     */
    async processBatch(files: File[], config: ImageConfig): Promise<BatchResult> {
        this.processingSubject.next(true);
        const results: ProcessedImage[] = [];
        const failures: ProcessFailure[] = [];

        try {
            for (const file of files) {
                try {
                    const result = await this.processImage(file, config);
                    results.push(result);
                } catch (error) {
                    const message = error instanceof Error ? error.message : 'Unknown processing error';
                    failures.push({ file, error: message });
                    console.error(`Error processing ${file.name}:`, error);
                }
            }

            // Update the BehaviorSubject with new results
            if (results.length) {
                const currentImages = this.processedImagesSubject.value;
                const updatedImages = [...currentImages, ...results];
                this.processedImagesSubject.next(updatedImages);

                // Save to storage if enabled
                this.storageService.setItem('processedImages', updatedImages);
            }

            return { processed: results, failed: failures };
        } finally {
            this.processingSubject.next(false);
        }
    }

    /**
     * Clear all processed images
     */
    clearProcessedImages(): void {
        this.processedImagesSubject.next([]);
        this.storageService.removeItem('processedImages');
    }

    /**
     * Get all processed images
     */
    getProcessedImages(): ProcessedImage[] {
        return this.processedImagesSubject.value;
    }

    /**
     * Download a processed image
     */
    downloadImage(processedImage: ProcessedImage): void {
        const link = document.createElement('a');
        link.href = processedImage.dataUrl;
        link.download = processedImage.file.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    /**
     * Download all processed images as a zip file
     * Requires JSZip library
     */
    async downloadAllAsZip(): Promise<void> {
        const images = this.getProcessedImages();

        // Dynamically import JSZip
        try {
            const JSZip = await import('jszip').then(module => module.default);
            const zip = new JSZip();

            // Add each image to the zip
            images.forEach(image => {
                // Convert data URL to blob
                const imageData = this.dataUrlToBlob(image.dataUrl);
                zip.file(image.file.name, imageData);
            });

            // Generate the zip file
            const content = await zip.generateAsync({ type: 'blob' });

            // Create download link
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = `imageflexer-${new Date().toISOString().slice(0, 10)}.zip`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            // Clean up the object URL
            URL.revokeObjectURL(link.href);
        } catch (error) {
            console.error('Error creating zip file:', error);
            // Fallback: download images individually
            images.forEach(image => this.downloadImage(image));
        }
    }

    /**
     * Helper method to resize and convert an image
     */
    private resizeAndConvertImage(img: HTMLImageElement, originalFile: File, config: ImageConfig): ProcessedImage {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
            throw new Error('Failed to get canvas context');
        }

        // Calculate new dimensions
        let { width, height } = img;

        if (config.preserveAspectRatio !== false) {
            if (config.maxWidth && width > config.maxWidth) {
                const ratio = config.maxWidth / width;
                width = config.maxWidth;
                height = Math.round(height * ratio);
            }

            if (config.maxHeight && height > config.maxHeight) {
                const ratio = config.maxHeight / height;
                height = config.maxHeight;
                width = Math.round(width * ratio);
            }
        } else {
            width = config.maxWidth || width;
            height = config.maxHeight || height;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw image on canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Convert to specified format
        const format = config.format || this.getFormatFromMimeType(originalFile.type);
        const quality = config.quality !== undefined ? config.quality / 100 : 0.92;

        // Get data URL
        const dataUrl = canvas.toDataURL(format, quality);

        // Create a blob and new file
        const blob = this.dataUrlToBlob(dataUrl);
        const fileExtension = this.getExtensionFromMimeType(format);

        // Create a new filename if one wasn't provided
        const filename = config.filename ||
            originalFile.name.replace(/\.[^/.]+$/, '') + '.' + fileExtension;

        const newFile = new File([blob], filename, { type: format });

        return {
            dataUrl,
            file: newFile,
            originalSize: originalFile.size,
            newSize: blob.size,
            width,
            height,
            format: format
        };
    }

    /**
     * Helper method to convert data URL to Blob
     */
    private dataUrlToBlob(dataUrl: string): Blob {
        const arr = dataUrl.split(',');
        const mime = arr[0].match(/:(.*?);/)?.[1] || '';
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);

        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }

        return new Blob([u8arr], { type: mime });
    }

    /**
     * Helper method to get MIME type from file
     */
    private getFormatFromMimeType(mimeType: string): string {
        switch (mimeType) {
            case 'image/png':
                return 'image/png';
            case 'image/webp':
                return 'image/webp';
            case 'image/avif':
                return 'image/avif';
            default:
                return 'image/jpeg';
        }
    }

    /**
     * Helper method to get file extension from MIME type
     */
    private getExtensionFromMimeType(mimeType: string): string {
        switch (mimeType) {
            case 'image/png':
                return 'png';
            case 'image/webp':
                return 'webp';
            case 'image/avif':
                return 'avif';
            default:
                return 'jpg';
        }
    }
}
