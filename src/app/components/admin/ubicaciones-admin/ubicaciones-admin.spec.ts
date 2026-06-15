import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UbicacionesAdmin } from './ubicaciones-admin';

describe('UbicacionesAdmin', () => {
  let component: UbicacionesAdmin;
  let fixture: ComponentFixture<UbicacionesAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UbicacionesAdmin],
    }).compileComponents();

    fixture = TestBed.createComponent(UbicacionesAdmin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
