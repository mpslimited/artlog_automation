import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalPopupComponent } from './global-popup.component';

describe('GlobalPopupComponent', () => {
  let component: GlobalPopupComponent;
  let fixture: ComponentFixture<GlobalPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
