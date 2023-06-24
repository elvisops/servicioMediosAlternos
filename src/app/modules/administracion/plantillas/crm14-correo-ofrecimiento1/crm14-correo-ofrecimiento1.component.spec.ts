import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Crm14CorreoOfrecimiento1Component } from './crm14-correo-ofrecimiento1.component';

describe('Crm14CorreoOfrecimiento1Component', () => {
  let component: Crm14CorreoOfrecimiento1Component;
  let fixture: ComponentFixture<Crm14CorreoOfrecimiento1Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Crm14CorreoOfrecimiento1Component]
    });
    fixture = TestBed.createComponent(Crm14CorreoOfrecimiento1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
