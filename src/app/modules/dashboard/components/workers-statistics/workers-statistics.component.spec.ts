import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersStatisticsComponent } from './workers-statistics.component';

describe('WorkersStatisticsComponent', () => {
  let component: WorkersStatisticsComponent;
  let fixture: ComponentFixture<WorkersStatisticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkersStatisticsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkersStatisticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
