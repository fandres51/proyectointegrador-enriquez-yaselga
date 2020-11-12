import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosFiltrosComponent } from './productos-filtros.component';

describe('ProductosFiltrosComponent', () => {
  let component: ProductosFiltrosComponent;
  let fixture: ComponentFixture<ProductosFiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosFiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
