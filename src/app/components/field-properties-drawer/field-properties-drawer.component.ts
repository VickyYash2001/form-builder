import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldType } from '../../models/form-field.model';
import { FormBuilderService } from '../../services/form-builder.service';
import { CdkDrag, CdkDropList, DragDropModule } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-field-properties-drawer',
  standalone: true,
  imports: [CommonModule, CdkDrag, CdkDropList, DragDropModule],
  templateUrl: './field-properties-drawer.component.html',
  styleUrl: './field-properties-drawer.component.scss'
})
export class FieldPropertiesDrawerComponent {
  @ViewChild('libraryList') libraryList!: CdkDropList;
  fieldTypes = [
    { type: FormFieldType.Text, name: 'Single Line Text', icon: 'text_fields', defaultName: 'Text Field' },
    { type: FormFieldType.Textarea, name: 'Multi Line Text', icon: 'notes', defaultName: 'Text Area' },
    { type: FormFieldType.Number, name: 'Number', icon: 'numbers',  defaultName: 'Number' },
    { type: FormFieldType.Email, name: 'Email', icon: 'email', defaultName: 'Email' },
    { type: FormFieldType.Date, name: 'Date', icon: 'calendar_today', defaultName: 'Date' },
    { type: FormFieldType.Time, name: 'Time', icon: 'schedule', defaultName: 'Time' },
    { type: FormFieldType.Datetime, name: 'Date & Time', icon: 'date_range', defaultName: 'Date Time' },
    { type: FormFieldType.Select, name: 'Drop Down', icon: 'arrow_drop_down_circle', defaultName: 'Dropdown' },
    { type: FormFieldType.Radio, name: 'Single Selection', icon: 'radio_button_checked', defaultName: 'Radio Buttons' },
    { type: FormFieldType.Checkbox, name: 'Check Box', icon: 'check_box', defaultName: 'Checkbox' },
    { type: FormFieldType.Multiselect, name: 'Multi Selection', icon: 'playlist_add_check', defaultName: 'Multi Select' },
    { type: FormFieldType.File, name: 'File Upload', icon: 'attach_file', defaultName: 'File Upload' }
  ]

  constructor(private formBuilderService: FormBuilderService) {

  }
}
