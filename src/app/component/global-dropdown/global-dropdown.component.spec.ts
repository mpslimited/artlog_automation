import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalDropdownComponent } from './global-dropdown.component';

describe('GlobalDropdownComponent', () => {
  let component: GlobalDropdownComponent;
  let fixture: ComponentFixture<GlobalDropdownComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalDropdownComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalDropdownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
