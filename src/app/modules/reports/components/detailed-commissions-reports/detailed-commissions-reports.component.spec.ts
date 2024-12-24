import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailedCommissionsReportsComponent } from './detailed-commissions-reports.component';

describe('DetailedCommissionsReportsComponent', () => {
  let component: DetailedCommissionsReportsComponent;
  let fixture: ComponentFixture<DetailedCommissionsReportsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DetailedCommissionsReportsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailedCommissionsReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
