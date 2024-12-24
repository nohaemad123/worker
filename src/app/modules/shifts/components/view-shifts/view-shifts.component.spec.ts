import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShiftsComponent } from './view-shifts.component';

describe('ViewShiftsComponent', () => {
  let component: ViewShiftsComponent;
  let fixture: ComponentFixture<ViewShiftsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewShiftsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
