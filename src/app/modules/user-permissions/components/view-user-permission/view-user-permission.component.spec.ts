import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewUserPermissionComponent } from './view-user-permission.component';

describe('ViewUserPermissionComponent', () => {
  let component: ViewUserPermissionComponent;
  let fixture: ComponentFixture<ViewUserPermissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewUserPermissionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewUserPermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
