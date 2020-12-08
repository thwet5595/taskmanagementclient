import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAccountLockedDialogComponent } from './user-account-locked-dialog.component';

describe('UserAccountLockedDialogComponent', () => {
  let component: UserAccountLockedDialogComponent;
  let fixture: ComponentFixture<UserAccountLockedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAccountLockedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAccountLockedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
