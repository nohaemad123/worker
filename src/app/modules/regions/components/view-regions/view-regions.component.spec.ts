import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRegionsComponent } from './view-regions.component';

describe('ViewRegionsComponent', () => {
  let component: ViewRegionsComponent;
  let fixture: ComponentFixture<ViewRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRegionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
