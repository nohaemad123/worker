import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedServicesComponent } from './deleted-services.component';

describe('DeletedServicesComponent', () => {
  let component: DeletedServicesComponent;
  let fixture: ComponentFixture<DeletedServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletedServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
