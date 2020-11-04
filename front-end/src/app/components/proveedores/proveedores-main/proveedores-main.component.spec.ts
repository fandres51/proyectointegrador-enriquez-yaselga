import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresMainComponent } from './proveedores-main.component';

describe('ProveedoresMainComponent', () => {
  let component: ProveedoresMainComponent;
  let fixture: ComponentFixture<ProveedoresMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProveedoresMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProveedoresMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
