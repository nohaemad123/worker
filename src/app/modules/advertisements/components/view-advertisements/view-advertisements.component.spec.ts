import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAdvertisementsComponent } from './view-advertisements.component';

describe('ViewAdvertisementsComponent', () => {
  let component: ViewAdvertisementsComponent;
  let fixture: ComponentFixture<ViewAdvertisementsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewAdvertisementsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewAdvertisementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
