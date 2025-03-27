import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldGroupsPanelComponent } from './field-groups-panel.component';

describe('FieldGroupsPanelComponent', () => {
  let component: FieldGroupsPanelComponent;
  let fixture: ComponentFixture<FieldGroupsPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldGroupsPanelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldGroupsPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
