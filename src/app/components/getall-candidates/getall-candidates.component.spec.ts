import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetallCandidatesComponent } from './getall-candidates.component';

describe('GetallCandidatesComponent', () => {
  let component: GetallCandidatesComponent;
  let fixture: ComponentFixture<GetallCandidatesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetallCandidatesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetallCandidatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
