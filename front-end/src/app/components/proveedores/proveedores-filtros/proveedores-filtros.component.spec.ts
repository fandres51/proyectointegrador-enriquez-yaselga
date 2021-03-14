import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresFiltrosComponent } from './proveedores-filtros.component';

describe('ProveedoresFiltrosComponent', () => {
  let component: ProveedoresFiltrosComponent;
  let fixture: ComponentFixture<ProveedoresFiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresFiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
