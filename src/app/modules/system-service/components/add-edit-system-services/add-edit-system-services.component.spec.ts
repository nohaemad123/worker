import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditSystemServicesComponent } from './add-edit-system-services.component';

describe('AddEditSystemServicesComponent', () => {
  let component: AddEditSystemServicesComponent;
  let fixture: ComponentFixture<AddEditSystemServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditSystemServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditSystemServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
