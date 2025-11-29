import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../core/services/image.service';
import { ImageConfig } from '../../../core/models/image-config.model';
import { StorageService } from '../../../core/services/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.less'],
  standalone: false
})
export class ConverterComponent implements OnInit {
  isProcessing = false;

  config: ImageConfig = {
    format: 'image/webp',
    quality: 90
  };

  formatOptions = [
    { label: 'JPG', value: 'image/jpeg' },
    { label: 'PNG', value: 'image/png' },
    { label: 'WebP', value: 'image/webp' },
    { label: 'AVIF', value: 'image/avif' }
  ];

  constructor(
    public imageService: ImageService,
    private storageService: StorageService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    // Initialize with settings
    const settings = this.storageService.getSettings();
    this.config.format = settings.defaultFormat;
    this.config.quality = settings.defaultQuality;

    // Subscribe to processing status
    this.imageService.processing$.subscribe(isProcessing => {
      this.isProcessing = isProcessing;
    });
  }

  async processImages(files: File[]): Promise<void> {
    if (!files.length) {
      this.message.warning('Please select images to convert');
      return;
    }

    try {
      const { processed, failed } = await this.imageService.processBatch(files, this.config);

      if (processed.length) {
        this.message.success(`Converted ${processed.length} image(s)`);
      }

      if (failed.length) {
        const failedNames = failed.map(item => item.file.name).join(', ');
        const prefix = processed.length ? 'Some files could not be processed' : 'Conversion failed';
        this.message.warning(`${prefix}: ${failedNames}`);
      }
    } catch (error) {
      console.error('Error processing images:', error);
      this.message.error('An error occurred while processing images');
    }
  }

  downloadImage(image: any): void {
    this.imageService.downloadImage(image);
  }

  downloadAll(): void {
    this.imageService.downloadAllAsZip();
  }

  clearResults(): void {
    this.imageService.clearProcessedImages();
  }
}
