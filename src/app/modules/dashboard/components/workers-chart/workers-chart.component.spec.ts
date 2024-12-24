import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkersChartComponent } from './workers-chart.component';

describe('WorkersChartComponent', () => {
  let component: WorkersChartComponent;
  let fixture: ComponentFixture<WorkersChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WorkersChartComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WorkersChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
