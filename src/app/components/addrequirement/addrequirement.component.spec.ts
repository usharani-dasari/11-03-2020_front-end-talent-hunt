import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrequirementComponent } from './addrequirement.component';

describe('AddrequirementComponent', () => {
  let component: AddrequirementComponent;
  let fixture: ComponentFixture<AddrequirementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrequirementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrequirementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
