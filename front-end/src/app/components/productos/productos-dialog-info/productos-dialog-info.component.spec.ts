import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductosDialogInfoComponent } from './productos-dialog-info.component';

describe('ProductosDialogInfoComponent', () => {
  let component: ProductosDialogInfoComponent;
  let fixture: ComponentFixture<ProductosDialogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductosDialogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductosDialogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
