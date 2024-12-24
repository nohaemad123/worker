import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalCommissionsReportsComponent } from './total-commissions-reports.component';

describe('TotalCommissionsReportsComponent', () => {
  let component: TotalCommissionsReportsComponent;
  let fixture: ComponentFixture<TotalCommissionsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TotalCommissionsReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalCommissionsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
