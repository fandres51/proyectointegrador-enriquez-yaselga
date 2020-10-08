import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosDetalleComponent } from './contratos-detalle.component';

describe('ContratosDetalleComponent', () => {
  let component: ContratosDetalleComponent;
  let fixture: ComponentFixture<ContratosDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
