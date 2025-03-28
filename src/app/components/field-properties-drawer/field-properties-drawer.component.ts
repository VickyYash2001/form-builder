import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormFieldType } from '../../models/form-field.model';
import { FormBuilderService } from '../../services/form-builder.service';

@Component({
  selector: 'app-field-properties-drawer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './field-properties-drawer.component.html',
  styleUrl: './field-properties-drawer.component.scss'
})
export class FieldPropertiesDrawerComponent {
  fieldTypes = [
    { type: FormFieldType.Text, name: 'Single Line Text', icon: 'text_fields' },
    { type: FormFieldType.Textarea, name: 'Multi Line Text', icon: 'notes' },
    { type: FormFieldType.Number, name: 'Number', icon: 'numbers' },
    { type: FormFieldType.Email, name: 'Email', icon: 'email' },
    { type: FormFieldType.Date, name: 'Date', icon: 'calendar_today' },
    { type: FormFieldType.Time, name: 'Time', icon: 'schedule' },
    { type: FormFieldType.Datetime, name: 'Date & Time', icon: 'date_range' },
    { type: FormFieldType.Select, name: 'Drop Down', icon: 'arrow_drop_down_circle' },
    { type: FormFieldType.Radio, name: 'Single Selection', icon: 'radio_button_checked' },
    { type: FormFieldType.Checkbox, name: 'Check Box', icon: 'check_box' },
    { type: FormFieldType.Multiselect, name: 'Multi Selection', icon: 'playlist_add_check' },
    { type: FormFieldType.File, name: 'File Upload', icon: 'attach_file' }
  ]

  constructor(private formBuilderService: FormBuilderService) {

  }

  onDragStart(event: DragEvent, fieldType: FormFieldType): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData('text/plain', fieldType);
      event.dataTransfer.effectAllowed = 'copy';
    }
  }
}
