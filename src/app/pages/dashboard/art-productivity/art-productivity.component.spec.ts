import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtProductivityComponent } from './art-productivity.component';

describe('ArtProductivityComponent', () => {
  let component: ArtProductivityComponent;
  let fixture: ComponentFixture<ArtProductivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtProductivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtProductivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
