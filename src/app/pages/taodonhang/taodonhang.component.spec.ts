import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaodonhangComponent } from './taodonhang.component';

describe('TaodonhangComponent', () => {
  let component: TaodonhangComponent;
  let fixture: ComponentFixture<TaodonhangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaodonhangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaodonhangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
