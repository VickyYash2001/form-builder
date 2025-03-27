import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FieldGroupsPanelComponent } from './components/field-groups-panel/field-groups-panel.component';
import { FormElementsPanelComponent } from './components/form-elements-panel/form-elements-panel.component';
import { ElementsLibraryPanelComponent } from './components/elements-library-panel/elements-library-panel.component';
import { FieldPropertiesDrawerComponent } from './components/field-properties-drawer/field-properties-drawer.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FieldGroupsPanelComponent,
    FormElementsPanelComponent,
    ElementsLibraryPanelComponent,
    FieldPropertiesDrawerComponent

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Form Builder';
}
