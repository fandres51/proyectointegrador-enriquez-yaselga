import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesConsultarAsociacionComponent } from './ajustes-consultar-asociacion.component';

describe('AjustesConsultarAsociacionComponent', () => {
  let component: AjustesConsultarAsociacionComponent;
  let fixture: ComponentFixture<AjustesConsultarAsociacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesConsultarAsociacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesConsultarAsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
