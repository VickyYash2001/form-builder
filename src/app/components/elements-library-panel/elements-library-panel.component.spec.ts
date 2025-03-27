import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementsLibraryPanelComponent } from './elements-library-panel.component';

describe('ElementsLibraryPanelComponent', () => {
  let component: ElementsLibraryPanelComponent;
  let fixture: ComponentFixture<ElementsLibraryPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementsLibraryPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ElementsLibraryPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
