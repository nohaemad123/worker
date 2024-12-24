import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCommissionsComponent } from './view-commissions.component';

describe('ViewCommissionsComponent', () => {
  let component: ViewCommissionsComponent;
  let fixture: ComponentFixture<ViewCommissionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewCommissionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCommissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
