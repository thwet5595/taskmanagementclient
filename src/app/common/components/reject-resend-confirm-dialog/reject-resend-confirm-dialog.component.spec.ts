import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectResendConfirmDialogComponent } from './reject-resend-confirm-dialog.component';

describe('RejectResendConfirmDialogComponent', () => {
  let component: RejectResendConfirmDialogComponent;
  let fixture: ComponentFixture<RejectResendConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RejectResendConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RejectResendConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
