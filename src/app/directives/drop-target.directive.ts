import { Directive, EventEmitter, Output, ElementRef } from '@angular/core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';

@Directive({
  selector: '[appDropTarget]',
  standalone: true
})
export class DropTargetDirective {
  @Output() dropped = new EventEmitter<CdkDragDrop<any>>();

  constructor(private el: ElementRef) {

    this.el.nativeElement.classList.add('drop-target');
   }

}
