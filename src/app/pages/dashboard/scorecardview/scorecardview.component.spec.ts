import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScorecardviewComponent } from './scorecardview.component';

describe('ScorecardviewComponent', () => {
  let component: ScorecardviewComponent;
  let fixture: ComponentFixture<ScorecardviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScorecardviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScorecardviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
