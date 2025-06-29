import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProcessedImage } from '../../../core/models/image-config.model';

@Component({
  selector: 'app-image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.less'],
  standalone: false
})
export class ImagePreviewComponent {
  @Input() images: ProcessedImage[] = [];
  @Input() showComparison = false;

  @Output() download = new EventEmitter<ProcessedImage>();
  @Output() downloadAll = new EventEmitter<void>();
  @Output() clear = new EventEmitter<void>();

  selectedImage: ProcessedImage | null = null;

  constructor() { }

  selectImage(image: ProcessedImage): void {
    this.selectedImage = image;
  }

  downloadImage(image: ProcessedImage): void {
    this.download.emit(image);
  }

  downloadAllImages(): void {
    this.downloadAll.emit();
  }

  clearImages(): void {
    this.clear.emit();
  }

  getSavingPercentage(image: ProcessedImage): number {
    if (image.originalSize <= image.newSize) {
      return 0;
    }
    return ((image.originalSize - image.newSize) / image.originalSize) * 100;
  }
}