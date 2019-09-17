import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetupTopMenuBarComponent } from './setup-top-menu-bar.component';

describe('SetupTopMenuBarComponent', () => {
  let component: SetupTopMenuBarComponent;
  let fixture: ComponentFixture<SetupTopMenuBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetupTopMenuBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetupTopMenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
