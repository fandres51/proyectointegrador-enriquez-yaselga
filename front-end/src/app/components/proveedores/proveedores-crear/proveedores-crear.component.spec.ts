import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresCrearComponent } from './proveedores-crear.component';

describe('ProveedoresCrearComponent', () => {
  let component: ProveedoresCrearComponent;
  let fixture: ComponentFixture<ProveedoresCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
