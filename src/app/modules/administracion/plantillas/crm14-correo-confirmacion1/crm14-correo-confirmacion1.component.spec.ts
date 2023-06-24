import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crm14CorreoConfirmacion1Component } from './crm14-correo-confirmacion1.component';

describe('Crm14CorreoConfirmacion1Component', () => {
  let component: Crm14CorreoConfirmacion1Component;
  let fixture: ComponentFixture<Crm14CorreoConfirmacion1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Crm14CorreoConfirmacion1Component]
    });
    fixture = TestBed.createComponent(Crm14CorreoConfirmacion1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
