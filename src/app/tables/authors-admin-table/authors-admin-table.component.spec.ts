import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsAdminTableComponent } from './authors-admin-table.component';

describe('AuthorsAdminTableComponent', () => {
  let component: AuthorsAdminTableComponent;
  let fixture: ComponentFixture<AuthorsAdminTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorsAdminTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AuthorsAdminTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
