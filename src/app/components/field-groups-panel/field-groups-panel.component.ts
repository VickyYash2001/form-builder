import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FieldGroup } from '../../models/field-group.model';
import { FormBuilderService } from '../../services/form-builder.service';


@Component({
  selector: 'app-field-groups-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './field-groups-panel.component.html',
  styleUrl: './field-groups-panel.component.scss'
})
export class FieldGroupsPanelComponent implements OnInit {
  fieldGroups: FieldGroup[] = [];
  newGroupName = '';
  newGroupDescription = '';
  isAddingGroup = false;
  selectedGroupId: string | null = null;
  editingGroupId: string | null = null;


  constructor(
    private formBuilderService: FormBuilderService,
  ) { }

  ngOnInit(): void {
    this.loadFieldGroups();
  }

  loadFieldGroups(): void {
    this.fieldGroups = this.formBuilderService.getFieldGroups();
    if (this.fieldGroups.length > 0 && !this.selectedGroupId) {
      this.selectGroup(this.fieldGroups[0].id);
    }
  }

  addFieldGroup(): void {
    if (this.newGroupName.trim()) {
      const newGroup: FieldGroup = {
        id: this.generateId(),
        name: this.newGroupName,
        description: this.newGroupDescription,
        fields: [],
        required: false,
        min: null,
        max: null
      };
      this.formBuilderService.addFieldGroup(newGroup);
      this.resetForm();
      this.selectGroup(newGroup.id);
      this.loadFieldGroups();
    }
  }


  startEditingGroup(group: FieldGroup): void {
    this.editingGroupId = group.id;
    this.newGroupName = group.name;
    this.newGroupDescription = group.description || '';
    this.isAddingGroup = false;
  }

  updateFieldGroup(): void {
    if (this.editingGroupId && this.newGroupName.trim()) {
      const updatedGroup: FieldGroup = {
        id: this.editingGroupId,
        name: this.newGroupName,
        description: this.newGroupDescription,
        fields: this.fieldGroups.find(g => g.id === this.editingGroupId)?.fields || [],
        required: false,
        min: null,
        max: null
      };
      this.formBuilderService.updateFieldGroup(updatedGroup);
      this.resetForm();
      this.loadFieldGroups();
    }
  }

  cancelEditing(): void {
    this.resetForm();
  }

  selectGroup(groupId: string): void {
    this.selectedGroupId = groupId;
    this.formBuilderService.setSelectedGroupId(groupId);
  }

  deleteGroup(groupId: string): void {
    this.formBuilderService.deleteFieldGroup(groupId);
    if (this.selectedGroupId === groupId) {
      this.selectedGroupId = this.fieldGroups.length > 0 ? this.fieldGroups[0].id : null;
      this.formBuilderService.setSelectedGroupId(this.selectedGroupId);
    }
    this.loadFieldGroups();
  }

  private resetForm(): void {
    this.newGroupName = '';
    this.newGroupDescription = '';
    this.isAddingGroup = false;
    this.editingGroupId = null;
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }
}
