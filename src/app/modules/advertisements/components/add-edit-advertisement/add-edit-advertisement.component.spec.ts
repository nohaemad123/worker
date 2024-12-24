import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAdvertisementComponent } from './add-edit-advertisement.component';

describe('AddEditAdvertisementComponent', () => {
  let component: AddEditAdvertisementComponent;
  let fixture: ComponentFixture<AddEditAdvertisementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditAdvertisementComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditAdvertisementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
