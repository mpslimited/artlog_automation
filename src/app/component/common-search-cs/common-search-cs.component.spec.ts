import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonSearchCsComponent } from './common-search-cs.component';

describe('CommonSearchCsComponent', () => {
  let component: CommonSearchCsComponent;
  let fixture: ComponentFixture<CommonSearchCsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommonSearchCsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommonSearchCsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
