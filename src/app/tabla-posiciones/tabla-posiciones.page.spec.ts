import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaPosicionesPage } from './tabla-posiciones.page';

describe('TablaPosicionesPage', () => {
  let component: TablaPosicionesPage;
  let fixture: ComponentFixture<TablaPosicionesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaPosicionesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaPosicionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
