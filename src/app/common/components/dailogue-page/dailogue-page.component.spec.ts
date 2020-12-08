import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DailoguePageComponent } from './dailogue-page.component';

describe('RetailerPageComponent', () => {
  let component: DailoguePageComponent;
  let fixture: ComponentFixture<DailoguePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DailoguePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DailoguePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
