import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessRepeatingComponent } from './process-repeating.component';

describe('ProcessRepeatingComponent', () => {
  let component: ProcessRepeatingComponent;
  let fixture: ComponentFixture<ProcessRepeatingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessRepeatingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessRepeatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
