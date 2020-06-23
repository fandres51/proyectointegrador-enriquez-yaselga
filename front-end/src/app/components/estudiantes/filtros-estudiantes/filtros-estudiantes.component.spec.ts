import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosEstudiantesComponent } from './filtros-estudiantes.component';

describe('FiltrosEstudiantesComponent', () => {
  let component: FiltrosEstudiantesComponent;
  let fixture: ComponentFixture<FiltrosEstudiantesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosEstudiantesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosEstudiantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
