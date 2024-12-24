import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCompanyBranchesComponent } from './view-company-branches.component';

describe('ViewCompanyBranchesComponent', () => {
  let component: ViewCompanyBranchesComponent;
  let fixture: ComponentFixture<ViewCompanyBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCompanyBranchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCompanyBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
