import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Man11Component } from './man11.component';

describe('Man11Component', () => {
  let component: Man11Component;
  let fixture: ComponentFixture<Man11Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Man11Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Man11Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
