import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FixturePage } from './fixture.page';

describe('FixturePage', () => {
  let component: FixturePage;
  let fixture: ComponentFixture<FixturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FixturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FixturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
