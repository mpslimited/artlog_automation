import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChooseJobQueueComponent } from './choose-job-queue.component';

describe('ChooseJobQueueComponent', () => {
  let component: ChooseJobQueueComponent;
  let fixture: ComponentFixture<ChooseJobQueueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChooseJobQueueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChooseJobQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
