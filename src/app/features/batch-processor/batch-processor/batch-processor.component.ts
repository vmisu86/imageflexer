import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../core/services/image.service';
import { ImageConfig } from '../../../core/models/image-config.model';
import { StorageService } from '../../../core/services/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-batch-processor',
  templateUrl: './batch-processor.component.html',
  styleUrls: ['./batch-processor.component.less'],
  standalone: false
})
export class BatchProcessorComponent implements OnInit {
  isProcessing = false;

  config: ImageConfig = {
    format: 'image/webp',
    maxWidth: 1200,
    maxHeight: 800,
    quality: 90,
    preserveAspectRatio: true
  };

  formatOptions = [
    { label: 'JPG', value: 'image/jpeg' },
    { label: 'PNG', value: 'image/png' },
    { label: 'WebP', value: 'image/webp' },
    { label: 'AVIF', value: 'image/avif' },
    { label: 'Keep Original', value: '' }
  ];

  // Operation flags
  resizeEnabled = true;
  convertEnabled = true;

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
      this.message.warning('Please select images to process');
      return;
    }

    // Prepare the config based on enabled operations
    const processingConfig: ImageConfig = { ...this.config };

    if (!this.resizeEnabled) {
      delete processingConfig.maxWidth;
      delete processingConfig.maxHeight;
      delete processingConfig.preserveAspectRatio;
    }

    if (!this.convertEnabled) {
      delete processingConfig.format;
      delete processingConfig.quality;
    }

    try {
      await this.imageService.processBatch(files, processingConfig);
      this.message.success(`Successfully processed ${files.length} image(s)`);
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