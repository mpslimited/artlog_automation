import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtDashboardComponent } from './art-dashboard.component';

describe('ArtDashboardComponent', () => {
  let component: ArtDashboardComponent;
  let fixture: ComponentFixture<ArtDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
