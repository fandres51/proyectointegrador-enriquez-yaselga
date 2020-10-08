import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesDefinirAporteComponent } from './ajustes-definir-aporte.component';

describe('AjustesDefinirAporteComponent', () => {
  let component: AjustesDefinirAporteComponent;
  let fixture: ComponentFixture<AjustesDefinirAporteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesDefinirAporteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesDefinirAporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
