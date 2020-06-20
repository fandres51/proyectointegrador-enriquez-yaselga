import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioActualizacionComponent } from './formulario-actualizacion.component';

describe('FormularioActualizacionComponent', () => {
  let component: FormularioActualizacionComponent;
  let fixture: ComponentFixture<FormularioActualizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioActualizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioActualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
