import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletedRegionsComponent } from './deleted-regions.component';

describe('DeletedRegionsComponent', () => {
  let component: DeletedRegionsComponent;
  let fixture: ComponentFixture<DeletedRegionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeletedRegionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeletedRegionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
