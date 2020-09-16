import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonTablaInicioComponent } from './skeleton-tabla-inicio.component';

describe('SkeletonTablaInicioComponent', () => {
  let component: SkeletonTablaInicioComponent;
  let fixture: ComponentFixture<SkeletonTablaInicioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SkeletonTablaInicioComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonTablaInicioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
