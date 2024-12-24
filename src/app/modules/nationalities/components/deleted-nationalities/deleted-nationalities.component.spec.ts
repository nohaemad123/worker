import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedNationalitiesComponent } from './deleted-nationalities.component';

describe('DeletedNationalitiesComponent', () => {
  let component: DeletedNationalitiesComponent;
  let fixture: ComponentFixture<DeletedNationalitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletedNationalitiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedNationalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
