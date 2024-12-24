import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProvidedServicesComponent } from './add-edit-provided-services.component';

describe('AddEditProvidedServicesComponent', () => {
  let component: AddEditProvidedServicesComponent;
  let fixture: ComponentFixture<AddEditProvidedServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditProvidedServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditProvidedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
