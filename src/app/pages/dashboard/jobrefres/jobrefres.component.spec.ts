import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobrefresComponent } from './jobrefres.component';

describe('JobrefresComponent', () => {
  let component: JobrefresComponent;
  let fixture: ComponentFixture<JobrefresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobrefresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobrefresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
