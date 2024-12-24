import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCompanyBranchesComponent } from './add-edit-company-branches.component';

describe('AddEditCompanyBranchesComponent', () => {
  let component: AddEditCompanyBranchesComponent;
  let fixture: ComponentFixture<AddEditCompanyBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditCompanyBranchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditCompanyBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
