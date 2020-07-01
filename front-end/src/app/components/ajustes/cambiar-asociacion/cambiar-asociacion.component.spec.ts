import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CambiarAsociacionComponent } from './cambiar-asociacion.component';

describe('CambiarAsociacionComponent', () => {
  let component: CambiarAsociacionComponent;
  let fixture: ComponentFixture<CambiarAsociacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CambiarAsociacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CambiarAsociacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
