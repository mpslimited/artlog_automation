import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgChecboxHeaderComponent } from './ag-checbox-header.component';

describe('AgChecboxHeaderComponent', () => {
  let component: AgChecboxHeaderComponent;
  let fixture: ComponentFixture<AgChecboxHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgChecboxHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgChecboxHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
