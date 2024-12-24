import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditJobsComponent } from './add-edit-jobs.component';

describe('AddEditJobsComponent', () => {
  let component: AddEditJobsComponent;
  let fixture: ComponentFixture<AddEditJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
