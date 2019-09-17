import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgRadioComponentVertical } from './ag-radio.component';

describe('AgRadioComponent', () => {
  let component: AgRadioComponentVertical;
  let fixture: ComponentFixture<AgRadioComponentVertical>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AgRadioComponentVertical]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgRadioComponentVertical);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
