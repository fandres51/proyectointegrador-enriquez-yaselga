import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesCambiarAsociacionComponent } from './ajustes-cambiar-asociacion.component';

describe('AjustesCambiarAsociacionComponent', () => {
  let component: AjustesCambiarAsociacionComponent;
  let fixture: ComponentFixture<AjustesCambiarAsociacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesCambiarAsociacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesCambiarAsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
