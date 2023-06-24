import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crm35CorreoConfirmacion1Component } from './crm35-correo-confirmacion1.component';

describe('Crm35CorreoConfirmacion1Component', () => {
  let component: Crm35CorreoConfirmacion1Component;
  let fixture: ComponentFixture<Crm35CorreoConfirmacion1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Crm35CorreoConfirmacion1Component]
    });
    fixture = TestBed.createComponent(Crm35CorreoConfirmacion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
