import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClubDetallePage } from './club-detalle.page';

describe('ClubDetallePage', () => {
  let component: ClubDetallePage;
  let fixture: ComponentFixture<ClubDetallePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClubDetallePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClubDetallePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
