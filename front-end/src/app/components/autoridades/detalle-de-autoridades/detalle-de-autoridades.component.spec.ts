import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleDeAutoridadesComponent } from './detalle-de-autoridades.component';

describe('DetalleDeAutoridadesComponent', () => {
  let component: DetalleDeAutoridadesComponent;
  let fixture: ComponentFixture<DetalleDeAutoridadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleDeAutoridadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleDeAutoridadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
