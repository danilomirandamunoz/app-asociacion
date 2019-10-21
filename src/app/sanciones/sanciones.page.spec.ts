import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SancionesPage } from './sanciones.page';

describe('SancionesPage', () => {
  let component: SancionesPage;
  let fixture: ComponentFixture<SancionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SancionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SancionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
