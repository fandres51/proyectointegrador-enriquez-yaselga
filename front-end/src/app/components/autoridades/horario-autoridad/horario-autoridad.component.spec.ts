import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HorarioAutoridadComponent } from './horario-autoridad.component';

describe('HorarioAutoridadComponent', () => {
  let component: HorarioAutoridadComponent;
  let fixture: ComponentFixture<HorarioAutoridadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HorarioAutoridadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HorarioAutoridadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
