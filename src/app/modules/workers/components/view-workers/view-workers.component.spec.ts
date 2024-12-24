import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkersComponent } from './view-workers.component';

describe('ViewWorkersComponent', () => {
  let component: ViewWorkersComponent;
  let fixture: ComponentFixture<ViewWorkersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewWorkersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewWorkersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
