import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustDesktopComponent } from './cust-desktop.component';

describe('CustDesktopComponent', () => {
  let component: CustDesktopComponent;
  let fixture: ComponentFixture<CustDesktopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustDesktopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
