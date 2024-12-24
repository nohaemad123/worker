import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewServicesPricingComponent } from './view-services-pricing.component';

describe('ViewServicesPricingComponent', () => {
  let component: ViewServicesPricingComponent;
  let fixture: ComponentFixture<ViewServicesPricingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewServicesPricingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewServicesPricingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
