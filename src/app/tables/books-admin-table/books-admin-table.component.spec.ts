import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksAdminTableComponent } from './books-admin-table.component';

describe('BooksAdminTableComponent', () => {
  let component: BooksAdminTableComponent;
  let fixture: ComponentFixture<BooksAdminTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksAdminTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BooksAdminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
