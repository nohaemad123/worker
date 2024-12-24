import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditUserPermissionComponent } from './add-edit-user-permission.component';

describe('AddEditUserPermissionComponent', () => {
  let component: AddEditUserPermissionComponent;
  let fixture: ComponentFixture<AddEditUserPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddEditUserPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddEditUserPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
