import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovedjobsComponent } from './approvedjobs.component';

describe('ApprovedjobsComponent', () => {
  let component: ApprovedjobsComponent;
  let fixture: ComponentFixture<ApprovedjobsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ApprovedjobsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApprovedjobsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
