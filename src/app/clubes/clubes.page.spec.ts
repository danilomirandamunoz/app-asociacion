import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubesPage } from './clubes.page';

describe('ClubesPage', () => {
  let component: ClubesPage;
  let fixture: ComponentFixture<ClubesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
