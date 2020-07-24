import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SyncJobsComponent } from './sync-jobs.component';

describe('SyncJobsComponent', () => {
  let component: SyncJobsComponent;
  let fixture: ComponentFixture<SyncJobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SyncJobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SyncJobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
