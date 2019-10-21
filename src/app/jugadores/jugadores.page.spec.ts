import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresPage } from './jugadores.page';

describe('JugadoresPage', () => {
  let component: JugadoresPage;
  let fixture: ComponentFixture<JugadoresPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JugadoresPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JugadoresPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
