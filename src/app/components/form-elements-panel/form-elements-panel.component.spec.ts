import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormElementsPanelComponent } from './form-elements-panel.component';

describe('FormElementsPanelComponent', () => {
  let component: FormElementsPanelComponent;
  let fixture: ComponentFixture<FormElementsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormElementsPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormElementsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
