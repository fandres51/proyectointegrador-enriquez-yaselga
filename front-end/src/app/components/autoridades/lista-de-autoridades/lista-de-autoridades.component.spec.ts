import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeAutoridadesComponent } from './lista-de-autoridades.component';

describe('ListaDeAutoridadesComponent', () => {
  let component: ListaDeAutoridadesComponent;
  let fixture: ComponentFixture<ListaDeAutoridadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaDeAutoridadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaDeAutoridadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
