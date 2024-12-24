import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditNationalitiesComponent } from './add-edit-nationalities.component';

describe('AddEditNationalitiesComponent', () => {
  let component: AddEditNationalitiesComponent;
  let fixture: ComponentFixture<AddEditNationalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditNationalitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditNationalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
