import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NombreEquipoPage } from './nombre-equipo.page';

describe('NombreEquipoPage', () => {
  let component: NombreEquipoPage;
  let fixture: ComponentFixture<NombreEquipoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NombreEquipoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NombreEquipoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
