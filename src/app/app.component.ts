import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldGroupsPanelComponent } from './components/field-groups-panel/field-groups-panel.component';
import { FormElementsPanelComponent } from './components/form-elements-panel/form-elements-panel.component';
import { ElementsLibraryPanelComponent } from './components/elements-library-panel/elements-library-panel.component';
import { FieldPropertiesDrawerComponent } from './components/field-properties-drawer/field-properties-drawer.component';
import { LivePreviewComponent } from './components/live-preview/live-preview.component';
import {
  DragDropModule,
} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FieldGroupsPanelComponent,
    FormElementsPanelComponent,
    ElementsLibraryPanelComponent,
    FieldPropertiesDrawerComponent,
    LivePreviewComponent,
    DragDropModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterViewInit {
  @ViewChild(FieldPropertiesDrawerComponent) propertiesDrawer!: FieldPropertiesDrawerComponent;
  @ViewChild(FormElementsPanelComponent) formElementsPanel!: FormElementsPanelComponent;
  @ViewChild('previewContainer', { read: ElementRef }) previewContainer!: ElementRef;
  @ViewChild('propertiesContainer', { read: ElementRef }) propertiesContainer!: ElementRef;

  title = 'Form Builder';
  showPreview = false;


  togglePreview() {
    this.showPreview = !this.showPreview;

    setTimeout(() => {
      if (this.showPreview && this.previewContainer) {
        this.scrollToPreview();
      }
      if (!this.showPreview && this.propertiesContainer) {
        this.scrollToProperties();
      }
    });
  }

  ngAfterViewInit() {
    if (this.propertiesDrawer && this.formElementsPanel) {
      this.propertiesDrawer.libraryList.connectedTo = [this.formElementsPanel.formElementsList];
      this.formElementsPanel.formElementsList.connectedTo = [this.propertiesDrawer.libraryList];
    }
  }

  private scrollToPreview() {
    this.previewContainer.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
    this.previewContainer.nativeElement.focus();
  }

  private scrollToProperties() {
    this.propertiesContainer.nativeElement.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'start'
    });
    this.previewContainer.nativeElement.focus();
  }
}
