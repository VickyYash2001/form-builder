import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldPropertiesDrawerComponent } from './field-properties-drawer.component';

describe('FieldPropertiesDrawerComponent', () => {
  let component: FieldPropertiesDrawerComponent;
  let fixture: ComponentFixture<FieldPropertiesDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FieldPropertiesDrawerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FieldPropertiesDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
