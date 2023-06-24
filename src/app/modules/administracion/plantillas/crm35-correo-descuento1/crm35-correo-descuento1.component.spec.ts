import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crm35CorreoDescuento1Component } from './crm35-correo-descuento1.component';

describe('Crm35CorreoDescuento1Component', () => {
  let component: Crm35CorreoDescuento1Component;
  let fixture: ComponentFixture<Crm35CorreoDescuento1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Crm35CorreoDescuento1Component]
    });
    fixture = TestBed.createComponent(Crm35CorreoDescuento1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
