import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crm35CorreoPNC1Component } from './crm35-correo-pnc1.component';

describe('Crm35CorreoPNC1Component', () => {
  let component: Crm35CorreoPNC1Component;
  let fixture: ComponentFixture<Crm35CorreoPNC1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Crm35CorreoPNC1Component]
    });
    fixture = TestBed.createComponent(Crm35CorreoPNC1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
