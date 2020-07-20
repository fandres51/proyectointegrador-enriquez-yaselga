import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioAfiliacionComponent } from './formulario-afiliacion.component';

describe('FormularioAfiliacionComponent', () => {
  let component: FormularioAfiliacionComponent;
  let fixture: ComponentFixture<FormularioAfiliacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormularioAfiliacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormularioAfiliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
