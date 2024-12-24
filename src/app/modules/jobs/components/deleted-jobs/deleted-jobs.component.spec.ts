import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedJobsComponent } from './deleted-jobs.component';

describe('DeletedJobsComponent', () => {
  let component: DeletedJobsComponent;
  let fixture: ComponentFixture<DeletedJobsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletedJobsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
