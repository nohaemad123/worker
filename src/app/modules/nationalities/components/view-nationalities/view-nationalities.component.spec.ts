import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewNationalitiesComponent } from './view-nationalities.component';

describe('ViewNationalitiesComponent', () => {
  let component: ViewNationalitiesComponent;
  let fixture: ComponentFixture<ViewNationalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewNationalitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewNationalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
