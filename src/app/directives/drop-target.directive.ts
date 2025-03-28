import { Directive, ElementRef, EventEmitter, Input, Output, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropTarget]',
  standalone: true
})
export class DropTargetDirective {
  @Input() groupId?: string;
  @Output() dropped = new EventEmitter<{fieldType: string, groupId?: string, position?: number}>();

  constructor(private el: ElementRef) {}

  @HostListener('dragover', ['$event']) onDragOver(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.classList.add('bg-blue-50', 'border-blue-200');
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = 'copy';
    }
  }

  @HostListener('dragleave', ['$event']) onDragLeave(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.classList.remove('bg-blue-50', 'border-blue-200');
  }

  @HostListener('drop', ['$event']) onDrop(event: DragEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.el.nativeElement.classList.remove('bg-blue-50', 'border-blue-200');

    if (event.dataTransfer) {
      const fieldType = event.dataTransfer.getData('text/plain');
      this.dropped.emit({fieldType, groupId: this.groupId});
    }
  }
}
