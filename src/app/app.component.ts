import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldGroupsPanelComponent } from './components/field-groups-panel/field-groups-panel.component';
import { FormElementsPanelComponent } from './components/form-elements-panel/form-elements-panel.component';
import { ElementsLibraryPanelComponent } from './components/elements-library-panel/elements-library-panel.component';
import { FieldPropertiesDrawerComponent } from './components/field-properties-drawer/field-properties-drawer.component';
import { LivePreviewComponent } from './components/live-preview/live-preview.component';
import { CdkDragDrop, moveItemInArray, transferArrayItem,
  DragDropModule, } from '@angular/cdk/drag-drop';
import { FormField } from './models/form-field.model';
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

  title = 'Form Builder';
  showPreview = false;


  togglePreview() {
    this.showPreview = !this.showPreview;
  }

  ngAfterViewInit() {
    // Connect the drop lists
    if (this.propertiesDrawer && this.formElementsPanel) {
      this.propertiesDrawer.libraryList.connectedTo = [this.formElementsPanel.formElementsList];
      this.formElementsPanel.formElementsList.connectedTo = [this.propertiesDrawer.libraryList];
    }
  }
}
