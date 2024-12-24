import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedProvidedServicesComponent } from './deleted-provided-services.component';

describe('DeletedProvidedServicesComponent', () => {
  let component: DeletedProvidedServicesComponent;
  let fixture: ComponentFixture<DeletedProvidedServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletedProvidedServicesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedProvidedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
