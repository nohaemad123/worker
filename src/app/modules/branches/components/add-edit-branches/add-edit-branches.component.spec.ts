import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditBranchesComponent } from './add-edit-branches.component';

describe('AddEditBranchesComponent', () => {
  let component: AddEditBranchesComponent;
  let fixture: ComponentFixture<AddEditBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditBranchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
