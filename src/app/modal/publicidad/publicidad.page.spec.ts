import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicidadPage } from './publicidad.page';

describe('PublicidadPage', () => {
  let component: PublicidadPage;
  let fixture: ComponentFixture<PublicidadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublicidadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicidadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
