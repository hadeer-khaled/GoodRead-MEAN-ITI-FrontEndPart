import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAdminTableComponent } from './categories-admin-table.component';

describe('CategoriesAdminTableComponent', () => {
  let component: CategoriesAdminTableComponent;
  let fixture: ComponentFixture<CategoriesAdminTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesAdminTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CategoriesAdminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
