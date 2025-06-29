import { Component, OnInit } from '@angular/core';
import { ImageService } from '../../../core/services/image.service';
import { ImageConfig } from '../../../core/models/image-config.model';
import { StorageService } from '../../../core/services/storage.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-resizer',
  templateUrl: './resizer.component.html',
  styleUrls: ['./resizer.component.less'],
  standalone: false
})
export class ResizerComponent implements OnInit {
  isProcessing = false;

  config: ImageConfig = {
    maxWidth: 1200,
    maxHeight: 800,
    preserveAspectRatio: true,
    quality: 90
  };

  presetSizes = [
    { label: 'HD (1280×720)', width: 1280, height: 720 },
    { label: 'Full HD (1920×1080)', width: 1920, height: 1080 },
    { label: 'Social Media (1200×630)', width: 1200, height: 630 },
    { label: 'Profile Photo (400×400)', width: 400, height: 400 },
    { label: 'Custom', width: null, height: null }
  ];

  selectedPreset = this.presetSizes[0];

  constructor(
    public imageService: ImageService,
    private storageService: StorageService,
    private message: NzMessageService
  ) { }

  ngOnInit(): void {
    // Initialize with settings
    const settings = this.storageService.getSettings();
    this.config.quality = settings.defaultQuality;

    // Subscribe to processing status
    this.imageService.processing$.subscribe(isProcessing => {
      this.isProcessing = isProcessing;
    });
  }

  async processImages(files: File[]): Promise<void> {
    if (!files.length) {
      this.message.warning('Please select images to resize');
      return;
    }

    try {
      await this.imageService.processBatch(files, this.config);
      this.message.success(`Successfully resized ${files.length} image(s)`);
    } catch (error) {
      console.error('Error processing images:', error);
      this.message.error('An error occurred while resizing images');
    }
  }

  onPresetChange(): void {
    if (this.selectedPreset.width !== null) {
      this.config.maxWidth = this.selectedPreset.width;
      this.config.maxHeight = this.selectedPreset.height;
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