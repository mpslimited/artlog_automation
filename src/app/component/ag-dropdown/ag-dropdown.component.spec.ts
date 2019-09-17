import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgDropdownComponent } from './ag-dropdown.component';

describe('AgDropdownComponent', () => {
  let component: AgDropdownComponent;
  let fixture: ComponentFixture<AgDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
