import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessSubmitJobComponent } from './process-submit-job.component';

describe('ProcessSubmitJobComponent', () => {
  let component: ProcessSubmitJobComponent;
  let fixture: ComponentFixture<ProcessSubmitJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessSubmitJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessSubmitJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
