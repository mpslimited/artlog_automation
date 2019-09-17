import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AgCheckBoxComponent } from './ag-check-box.component';

describe('AgCheckBoxComponent', () => {
  let component: AgCheckBoxComponent;
  let fixture: ComponentFixture<AgCheckBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgCheckBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgCheckBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
