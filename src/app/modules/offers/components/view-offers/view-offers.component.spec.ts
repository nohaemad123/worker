import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewOffersComponent } from './view-offers.component';

describe('ViewOffersComponent', () => {
  let component: ViewOffersComponent;
  let fixture: ComponentFixture<ViewOffersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewOffersComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewOffersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
