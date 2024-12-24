import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedBranchesComponent } from './deleted-branches.component';

describe('DeletedBranchesComponent', () => {
  let component: DeletedBranchesComponent;
  let fixture: ComponentFixture<DeletedBranchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedBranchesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedBranchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
