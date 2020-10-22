import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesActualizacionComponent } from './estudiantes-actualizacion.component';

describe('EstudiantesActualizacionComponent', () => {
  let component: EstudiantesActualizacionComponent;
  let fixture: ComponentFixture<EstudiantesActualizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesActualizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesActualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
