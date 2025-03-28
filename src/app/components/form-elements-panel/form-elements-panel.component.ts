import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderService } from '../../services/form-builder.service';
import { FieldGroup } from '../../models/field-group.model';
import { FormField } from '../../models/form-field.model';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray, DragDropModule, CdkDragEnter } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-elements-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, CdkDropList, CdkDrag, DragDropModule],
  templateUrl: './form-elements-panel.component.html',
  styleUrl: './form-elements-panel.component.scss'
})
export class FormElementsPanelComponent implements OnInit {
  @ViewChild('formElementsList') formElementsList!: CdkDropList;
  selectedGroup: FieldGroup | null = null;
  fields: FormField[] = [];
  selectedFieldId: string | null = null;
  isDraggingOverEmpty = false;
  isDraggingOverTop = false;
  isDraggingOverBottom = false;
  dropPosition: number | 'top' | 'bottom' | null = null;

  constructor(private formBuilderService: FormBuilderService,
    private cdr: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.formBuilderService.selectedGroupId$.subscribe(groupId => {
      if (groupId) {
        this.selectedGroup = this.formBuilderService.getFieldGroup(groupId);
        this.fields = this.selectedGroup?.fields || [];
      } else {
        this.selectedGroup = null;
        this.fields = [];
      }
      this.cdr.detectChanges();
    });

    this.formBuilderService.selectedFieldId$.subscribe(fieldId => {
      this.selectedFieldId = fieldId;
      this.cdr.detectChanges();
    });
  }

  selectField(fieldId: string): void {
    this.formBuilderService.setSelectedFieldId(fieldId);
  }

  deleteField(fieldId: string): void {
    if (this.selectedGroup) {
      this.formBuilderService.deleteFieldFromGroup(this.selectedGroup.id, fieldId);
      this.fields = this.fields.filter(f => f.id !== fieldId);

      if (this.selectedFieldId === fieldId) {
        this.formBuilderService.setSelectedFieldId(null);
      }
      this.cdr.detectChanges();
    }
  }



  onDragEnter(event: CdkDragEnter<any>) {
    if (this.fields.length === 0) {
      this.isDraggingOverEmpty = true;
    }
  }

  onDragExit() {
    this.isDraggingOverEmpty = false;
    this.clearDropPosition();
  }

  setDropPosition(position: number | 'top' | 'bottom') {
    this.dropPosition = position;
    this.isDraggingOverTop = position === 'top';
    this.isDraggingOverBottom = position === 'bottom';
  }

  clearDropPosition() {
    this.dropPosition = null;
    this.isDraggingOverTop = false;
    this.isDraggingOverBottom = false;
  }

  // Modify your drop method
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // Reorder within the same list
      moveItemInArray(
        this.selectedGroup!.fields,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      // Handle drop from library
      const fieldData = event.previousContainer.data[event.previousIndex];

      if (this.selectedGroup) {
        let insertAt = 0;

        // Determine insert position based on drop zone
        if (this.dropPosition === 'top') {
          insertAt = 0;
        } else if (this.dropPosition === 'bottom') {
          insertAt = this.fields.length;
        } else if (typeof this.dropPosition === 'number') {
          insertAt = this.dropPosition;
        }

        // Add the field at the determined position
        this.formBuilderService.addFieldToGroupAtPosition(
          this.selectedGroup.id,
          fieldData.type,
          fieldData.defaultName || fieldData.name,
          insertAt
        );
      }
    }

    // Reset drop indicators
    this.isDraggingOverEmpty = false;
    this.clearDropPosition();

    // Update the group
    if (this.selectedGroup) {
      this.fields = [...this.selectedGroup.fields];
      this.formBuilderService.updateFieldGroup(this.selectedGroup);
      this.cdr.detectChanges();
    }
  }

}
