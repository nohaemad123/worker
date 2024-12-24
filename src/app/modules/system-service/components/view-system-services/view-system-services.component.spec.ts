import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSystemServicesComponent } from './view-system-services.component';

describe('ViewSystemServicesComponent', () => {
  let component: ViewSystemServicesComponent;
  let fixture: ComponentFixture<ViewSystemServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSystemServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSystemServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
