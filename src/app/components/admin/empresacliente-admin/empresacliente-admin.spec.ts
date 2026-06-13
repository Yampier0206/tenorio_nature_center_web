import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaClienteAdmin } from './empresacliente-admin';

describe('EmpresaclienteAdmin', () => {
  let component: EmpresaClienteAdmin;
  let fixture: ComponentFixture<EmpresaClienteAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpresaClienteAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(EmpresaClienteAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
