import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleRecursoComponent } from './detalle-recurso.component';

describe('DetalleRecursoComponent', () => {
  let component: DetalleRecursoComponent;
  let fixture: ComponentFixture<DetalleRecursoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleRecursoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleRecursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
