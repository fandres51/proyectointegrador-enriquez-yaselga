import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosMainComponent } from './productos-main.component';

describe('ProductosMainComponent', () => {
  let component: ProductosMainComponent;
  let fixture: ComponentFixture<ProductosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
