import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditServicesPricingComponent } from './add-edit-services-pricing.component';

describe('AddEditServicesPricingComponent', () => {
  let component: AddEditServicesPricingComponent;
  let fixture: ComponentFixture<AddEditServicesPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditServicesPricingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditServicesPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
