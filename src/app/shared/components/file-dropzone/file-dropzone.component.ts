import { Component, EventEmitter, Output, Input, OnInit, ChangeDetectorRef, NgZone, AfterViewInit, ChangeDetectionStrategy, OnDestroy } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-file-dropzone',
  templateUrl: './file-dropzone.component.html',
  styleUrls: ['./file-dropzone.component.less'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush // Use OnPush for better performance
})
export class FileDropzoneComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() maxFileSize = 50 * 1024 * 1024; // 50MB default
  @Input() multiple = true;
  @Input() accept = 'image/*';
  @Input() isProcessing = false;
  @Input() showPreview = true;

  @Output() fileSelected = new EventEmitter<File[]>();
  @Output() process = new EventEmitter<File[]>();

  files: File[] = [];
  isActive = false;
  private previewUrls: Map<File, string> = new Map();

  constructor(
    private message: NzMessageService,
    private cdr: ChangeDetectorRef,
    private ngZone: NgZone
  ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = true;
    this.cdr.markForCheck();
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;
    this.cdr.markForCheck();
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isActive = false;

    if (event.dataTransfer?.files) {
      this.handleFiles(event.dataTransfer.files);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.handleFiles(input.files);
    }
  }

  handleFiles(fileList: FileList): void {
    const newFiles: File[] = [];
    const invalidFiles: string[] = [];
    const oversizedFiles: string[] = [];

    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];

      // Check if it's an image
      if (!file.type.startsWith('image/')) {
        invalidFiles.push(file.name);
        continue;
      }

      // Check file size
      if (file.size > this.maxFileSize) {
        oversizedFiles.push(file.name);
        continue;
      }

      newFiles.push(file);
    }

    if (invalidFiles.length) {
      this.message.error(`Invalid file types: ${invalidFiles.join(', ')}`);
    }

    if (oversizedFiles.length) {
      this.message.error(`Files exceeding size limit: ${oversizedFiles.join(', ')}`);
    }

    if (newFiles.length) {
      // Run this inside the NgZone to ensure Angular's change detection works properly
      this.ngZone.run(() => {
        if (!this.multiple) {
          // Clean up existing preview URLs
          this.cleanupPreviewUrls();

          // Replace existing files if multiple is false
          this.files = newFiles;
        } else {
          // Add to existing files
          this.files = [...this.files, ...newFiles];
        }

        // Generate preview URLs for the new files
        for (const file of newFiles) {
          this.previewUrls.set(file, URL.createObjectURL(file));
        }

        this.fileSelected.emit(this.files);
        this.cdr.markForCheck(); // Mark for check after updating values
      });
    }
  }

  clearFiles(): void {
    this.cleanupPreviewUrls();
    this.files = [];
    this.fileSelected.emit(this.files);
    this.cdr.markForCheck();
  }

  processFiles(): void {
    if (this.files.length) {
      this.process.emit(this.files);
    } else {
      this.message.warning('Please select files first');
    }
  }

  // Get preview URL for an image
  getPreviewUrl(file: File): string {
    if (!this.previewUrls.has(file)) {
      this.previewUrls.set(file, URL.createObjectURL(file));
    }
    return this.previewUrls.get(file) || '';
  }

  // Add trackBy function for better performance with ngFor
  trackByFile(index: number, file: File): string {
    // Combine name and size to create a reasonably unique identifier for the file
    return `${file.name}-${file.size}-${file.lastModified}`;
  }

  // Clean up object URLs when no longer needed
  private cleanupPreviewUrls(): void {
    this.previewUrls.forEach(url => URL.revokeObjectURL(url));
    this.previewUrls.clear();
  }

  // Clean up object URLs when component is destroyed
  ngOnDestroy(): void {
    this.cleanupPreviewUrls();
  }
}