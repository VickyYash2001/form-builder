import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormBuilderService } from '../../services/form-builder.service';
import { FieldGroup } from '../../models/field-group.model';

@Component({
  selector: 'app-live-preview',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './live-preview.component.html',
  styleUrl: './live-preview.component.scss'
})
export class LivePreviewComponent implements OnInit {
  selectedGroup: FieldGroup | null = null;
  previewData: any = {};


  constructor(private formBuilderService: FormBuilderService) {}


  ngOnInit(): void {
    this.formBuilderService.selectedGroupId$.subscribe(groupId => {
      this.selectedGroup = groupId ? this.formBuilderService.getFieldGroup(groupId) : null;
      this.resetPreviewData();
    });
  }

  resetPreviewData(): void {
    this.previewData = {};
    if (this.selectedGroup) {
      this.selectedGroup.fields.forEach(field => {
        if (field.type === 'checkbox') {
          this.previewData[field.id] = false;
        } else if (field.type === 'multiselect') {
          this.previewData[field.id] = [];
        } else {
          this.previewData[field.id] = '';
        }
      });
    }
  }

  onSubmit(): void {
    console.log('Form submitted:', this.previewData);
    alert('Form submitted! Check console for data.');
  }
}
