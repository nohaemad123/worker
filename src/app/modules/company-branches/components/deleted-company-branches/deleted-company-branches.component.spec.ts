import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedCompanyBranchesComponent } from './deleted-company-branches.component';

describe('DeletedCompanyBranchesComponent', () => {
  let component: DeletedCompanyBranchesComponent;
  let fixture: ComponentFixture<DeletedCompanyBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedCompanyBranchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedCompanyBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
