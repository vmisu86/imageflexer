import { Directive, EventEmitter, HostBinding, HostListener, Output } from '@angular/core';

@Directive({
    selector: '[appDragDrop]',
    standalone: false
})
export class DragDropDirective {
    @HostBinding('class.file-over') fileOver: boolean = false;
    @Output() fileDropped = new EventEmitter<FileList>();

    @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = true;
    }

    @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = false;
    }

    @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
        event.preventDefault();
        event.stopPropagation();
        this.fileOver = false;

        if (event.dataTransfer && event.dataTransfer.files.length > 0) {
            this.fileDropped.emit(event.dataTransfer.files);
        }
    }
}