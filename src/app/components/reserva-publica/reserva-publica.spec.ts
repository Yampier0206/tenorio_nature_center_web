import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaPublica } from './reserva-publica';

describe('ReservaPublica', () => {
  let component: ReservaPublica;
  let fixture: ComponentFixture<ReservaPublica>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReservaPublica],
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaPublica);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
