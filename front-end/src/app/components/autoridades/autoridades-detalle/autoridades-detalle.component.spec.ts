import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadesDetalleComponent } from './autoridades-detalle.component';

describe('AutoridadesDetalleComponent', () => {
  let component: AutoridadesDetalleComponent;
  let fixture: ComponentFixture<AutoridadesDetalleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoridadesDetalleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoridadesDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
