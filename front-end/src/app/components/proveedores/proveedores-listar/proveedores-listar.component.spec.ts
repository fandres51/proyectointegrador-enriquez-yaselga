import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresListarComponent } from './proveedores-listar.component';

describe('ProveedoresListarComponent', () => {
  let component: ProveedoresListarComponent;
  let fixture: ComponentFixture<ProveedoresListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
