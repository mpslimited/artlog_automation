import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DropdownWithDescriptionComponent } from './dropdown-with-description.component';

describe('DropdownWithDescriptionComponent', () => {
  let component: DropdownWithDescriptionComponent;
  let fixture: ComponentFixture<DropdownWithDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DropdownWithDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DropdownWithDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
