import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditShiftsComponent } from './add-edit-shifts.component';

describe('AddEditShiftsComponent', () => {
  let component: AddEditShiftsComponent;
  let fixture: ComponentFixture<AddEditShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditShiftsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
