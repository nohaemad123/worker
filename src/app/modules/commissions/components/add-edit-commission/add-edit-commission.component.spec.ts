import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCommissionComponent } from './add-edit-commission.component';

describe('AddEditCommissionComponent', () => {
  let component: AddEditCommissionComponent;
  let fixture: ComponentFixture<AddEditCommissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditCommissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditCommissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
