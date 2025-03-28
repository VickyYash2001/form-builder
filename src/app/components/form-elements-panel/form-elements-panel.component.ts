import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilderService } from '../../services/form-builder.service';
import { FieldGroup } from '../../models/field-group.model';
import { FormField } from '../../models/form-field.model';
import { CdkDragDrop, CdkDrag, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { FormsModule } from '@angular/forms';
import { group } from '@angular/animations';
import { DropTargetDirective } from '../../directives/drop-target.directive';

@Component({
  selector: 'app-form-elements-panel',
  standalone: true,
  imports: [CommonModule, FormsModule, CdkDropList, CdkDrag, DropTargetDirective],
  templateUrl: './form-elements-panel.component.html',
  styleUrl: './form-elements-panel.component.scss'
})
export class FormElementsPanelComponent implements OnInit {
  selectedGroup: FieldGroup | null = null;
  fields: FormField[] = [];
  selectedFieldId: string | null = null;

  constructor(private formBuilderService: FormBuilderService) {

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
    });
    this.formBuilderService.selectedFieldId$.subscribe(fieldId => {
      this.selectedFieldId = fieldId;
    });
  }

  selectField(fieldId: string): void {
    this.formBuilderService.setSelectedFieldId(fieldId);
  }

  deleteField(fieldId: string): void {
    if (this.selectedGroup) {
      this.formBuilderService.deleteFieldFromGroup(this.selectedGroup.id, fieldId);
      if (this.selectedFieldId == fieldId) {
        this.formBuilderService.setSelectedFieldId(null);
      }
    }
  }

  // onFieldsReordered(): void {
  //   if (this.selectedGroup) {
  //     this.formBuilderService.updateFieldGroup(this.selectedGroup);
  //   }
  // }


  drop(event: CdkDragDrop<FormField[]>) {
    if (this.selectedGroup) {
      moveItemInArray(this.selectedGroup.fields, event.previousIndex, event.currentIndex);
      this.formBuilderService.updateFieldGroup(this.selectedGroup);
    }
  }
}
