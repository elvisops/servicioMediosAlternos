import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crm14CorreoPNC1Component } from './crm14-correo-pnc1.component';

describe('Crm14CorreoPNC1Component', () => {
  let component: Crm14CorreoPNC1Component;
  let fixture: ComponentFixture<Crm14CorreoPNC1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Crm14CorreoPNC1Component]
    });
    fixture = TestBed.createComponent(Crm14CorreoPNC1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
