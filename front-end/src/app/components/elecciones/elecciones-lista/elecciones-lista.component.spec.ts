import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionesListaComponent } from './elecciones-lista.component';

describe('EleccionesListaComponent', () => {
  let component: EleccionesListaComponent;
  let fixture: ComponentFixture<EleccionesListaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EleccionesListaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EleccionesListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
