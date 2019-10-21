import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstitucionPage } from './institucion.page';

describe('InstitucionPage', () => {
  let component: InstitucionPage;
  let fixture: ComponentFixture<InstitucionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstitucionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstitucionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
