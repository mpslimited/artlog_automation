import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessEditFooterComponent } from './process-edit-footer.component';

describe('ProcessEditFooterComponent', () => {
  let component: ProcessEditFooterComponent;
  let fixture: ComponentFixture<ProcessEditFooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProcessEditFooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessEditFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
