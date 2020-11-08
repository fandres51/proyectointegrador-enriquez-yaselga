import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresDialogInfoComponent } from './proveedores-dialog-info.component';

describe('ProveedoresDialogInfoComponent', () => {
  let component: ProveedoresDialogInfoComponent;
  let fixture: ComponentFixture<ProveedoresDialogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresDialogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresDialogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
