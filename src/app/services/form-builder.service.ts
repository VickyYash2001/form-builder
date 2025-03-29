import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FieldGroup } from '../models/field-group.model';
import { FormField, FormFieldType } from '../models/form-field.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class FormBuilderService {
  private readonly STORAGE_KEY = 'formBuilderGroups';
  private fieldGroups: FieldGroup[] = [];
  private selectedGroupIdSubject = new BehaviorSubject<string | null>(null);
  private selectedFieldIdSubject = new BehaviorSubject<string | null>(null);

  selectedGroupId$ = this.selectedGroupIdSubject.asObservable();
  selectedFieldId$ = this.selectedFieldIdSubject.asObservable();
  selectedField$ = new BehaviorSubject<FormField | null>(null);

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const savedGroups = localStorage.getItem(this.STORAGE_KEY);
    this.fieldGroups = savedGroups ? JSON.parse(savedGroups) : [];
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.fieldGroups));
  }

  getFieldGroups(): FieldGroup[] {
    return [...this.fieldGroups];
  }

  getFieldGroup(groupId: string): FieldGroup | null {
    return this.fieldGroups.find(g => g.id === groupId) || null;
  }

  addFieldGroup(group: FieldGroup): void {
    this.fieldGroups.push(group);
    this.saveToStorage();
  }

  updateFieldGroup(group: FieldGroup): void {
    const index = this.fieldGroups.findIndex(g => g.id === group.id);
    if (index >= 0) {
      this.fieldGroups[index] = group;
      this.saveToStorage();
    }
  }

  deleteFieldGroup(groupId: string): void {
    this.fieldGroups = this.fieldGroups.filter(g => g.id !== groupId);
    if (this.selectedGroupIdSubject.value === groupId) {
      this.selectedGroupIdSubject.next(null);
      this.selectedFieldIdSubject.next(null);
    }
    this.saveToStorage();
  }

  setSelectedGroupId(groupId: string | null): void {
    this.selectedGroupIdSubject.next(groupId);
    if (groupId) {
      this.selectedFieldIdSubject.next(null);
    }
  }

  setSelectedFieldId(fieldId: string | null): void {
    this.selectedFieldIdSubject.next(fieldId);
    if (fieldId && this.selectedGroupIdSubject.value) {
      const group = this.getFieldGroup(this.selectedGroupIdSubject.value);
      const field = group?.fields.find(f => f.id === fieldId);
      this.selectedField$.next(field || null);
    } else {
      this.selectedField$.next(null);
    }
  }

  addFieldToGroup(groupId: string, fieldType: FormFieldType, name?: string): void {
    const group = this.getFieldGroup(groupId);
    if (group) {
      const newField: FormField = {
        id: this.generateId(),
        type: fieldType,
        name: name || this.getDefaultName(fieldType),
        required: false
      };

      if (fieldType === FormFieldType.Select ||
        fieldType === FormFieldType.Radio ||
        fieldType === FormFieldType.Multiselect) {
        newField.options = ['Option 1', 'Option 2'];
      }

      group.fields.push(newField);
      this.updateFieldGroup(group);
      this.setSelectedFieldId(newField.id);
    }
  }

  private getDefaultName(fieldType: FormFieldType): string {
    const typeNames = {
      [FormFieldType.Text]: 'Text Field',
      [FormFieldType.Textarea]: 'Text Area',
      [FormFieldType.Number]: 'Number',
      [FormFieldType.Email]: 'Email',
      [FormFieldType.Date]: 'Date',
      [FormFieldType.Time]: 'Time',
      [FormFieldType.Datetime]: 'Date Time',
      [FormFieldType.Select]: 'Dropdown',
      [FormFieldType.Radio]: 'Radio Buttons',
      [FormFieldType.Checkbox]: 'Checkbox',
      [FormFieldType.Multiselect]: 'Multi Select',
      [FormFieldType.File]: 'File Upload'
    };
    return typeNames[fieldType] || 'Field';
  }

  addFieldToGroupAtPosition(
    groupId: string,
    fieldType: FormFieldType,
    name?: string,
    position?: number
  ): void {
    const group = this.getFieldGroup(groupId);
    if (group) {
      const newField: FormField = {
        id: this.generateId(),
        type: fieldType,
        name: name || this.getDefaultName(fieldType),
        required: false
      };

      if (fieldType === FormFieldType.Select ||
        fieldType === FormFieldType.Radio ||
        fieldType === FormFieldType.Multiselect) {
        newField.options = ['Option 1', 'Option 2'];
      }

      if (position !== undefined && position >= 0 && position <= group.fields.length) {
        group.fields.splice(position, 0, newField);
      } else {
        group.fields.push(newField);
      }

      this.updateFieldGroup(group);
      this.setSelectedFieldId(newField.id);
    }
  }

  updateFieldInGroup(groupId: string, field: FormField): void {
    const group = this.getFieldGroup(groupId);
    if (group) {
      const index = group.fields.findIndex(f => f.id === field.id);
      if (index >= 0) {
        group.fields[index] = field;
        this.updateFieldGroup(group);
        this.selectedField$.next(field);
      }
    }
  }

  deleteFieldFromGroup(groupId: string, fieldId: string): void {
    const group = this.getFieldGroup(groupId);
    if (group) {
      group.fields = group.fields.filter(f => f.id !== fieldId);
      this.updateFieldGroup(group);
    }
  }

  private generateId(): string {
    return Math.random().toString(36).substring(2, 11);
  }

  handleDrop(groupId: string, event: CdkDragDrop<any[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      const fieldType = event.previousContainer.data[event.previousIndex].type;
      this.addFieldToGroup(groupId, fieldType);
    }

    const group = this.getFieldGroup(groupId);
    if (group) {
      this.updateFieldGroup(group);
    }
  }
}
