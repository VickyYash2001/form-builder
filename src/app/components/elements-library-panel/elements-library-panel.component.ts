import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { FormField } from '../../models/form-field.model';
import { FieldGroup } from '../../models/field-group.model';

@Component({
  selector: 'app-elements-library-panel',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './elements-library-panel.component.html',
  styleUrl: './elements-library-panel.component.scss'
})
export class ElementsLibraryPanelComponent implements OnInit {
  selectedField: FormField | null = null;
  selectedGroup: FieldGroup | null = null;
  optionsString = '';


  constructor(private formBuilderService: FormBuilderService) { }


  ngOnInit(): void {
    this.formBuilderService.selectedField$.subscribe(field => {
      this.selectedField = field;
      if (field && (field.type === 'select' || field.type === 'radio' || field.type === 'multiselect')) {
        this.optionsString = field.options?.join('\n') || '';
      }
    });

    this.formBuilderService.selectedGroupId$.subscribe(groupId => {
      this.selectedGroup = groupId ? this.formBuilderService.getFieldGroup(groupId) : null;
    });
  }


  updateField(): void {
    if (this.selectedField && this.selectedGroup) {
      if (this.selectedField.type === 'select' || this.selectedField.type === 'radio' || this.selectedField.type === 'multiselect') {
        this.selectedField.options = this.optionsString.split('\n').filter(opt => opt.trim());
      }

      this.formBuilderService.updateFieldInGroup(this.selectedGroup.id, this.selectedField);
    }
  }

  getFieldTypeName(type: string): string {
    const typeNames: { [key: string]: string } = {
      'text': 'Single Line Text',
      'textarea': 'Multi Line Text',
      'number': 'Number',
      'email': 'Email',
      'date': 'Date',
      'time': 'Time',
      'datetime': 'Date & Time',
      'select': 'Dropdown',
      'radio': 'Single Selection',
      'checkbox': 'Checkbox',
      'multiselect': 'Multi Selection',
      'file': 'File Upload'
    };
    return typeNames[type] || type;
  }

}
