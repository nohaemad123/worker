import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewProvidedServicesComponent } from './view-provided-services.component';

describe('ViewProvidedServicesComponent', () => {
  let component: ViewProvidedServicesComponent;
  let fixture: ComponentFixture<ViewProvidedServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewProvidedServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewProvidedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
