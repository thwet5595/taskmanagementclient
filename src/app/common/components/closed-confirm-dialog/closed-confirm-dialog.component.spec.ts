import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClosedConfirmDialogComponent } from './closed-confirm-dialog.component';

describe('ClosedConfirmDialogComponent', () => {
  let component: ClosedConfirmDialogComponent;
  let fixture: ComponentFixture<ClosedConfirmDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClosedConfirmDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClosedConfirmDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
