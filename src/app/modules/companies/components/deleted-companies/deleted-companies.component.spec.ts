import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedCompaniesComponent } from './deleted-companies.component';

describe('DeletedCompaniesComponent', () => {
  let component: DeletedCompaniesComponent;
  let fixture: ComponentFixture<DeletedCompaniesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeletedCompaniesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedCompaniesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
