import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditRegionsComponent } from './add-edit-regions.component';

describe('AddEditRegionsComponent', () => {
  let component: AddEditRegionsComponent;
  let fixture: ComponentFixture<AddEditRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddEditRegionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
