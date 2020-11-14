import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesTerminarPeriodoComponent } from './ajustes-terminar-periodo.component';

describe('AjustesTerminarPeriodoComponent', () => {
  let component: AjustesTerminarPeriodoComponent;
  let fixture: ComponentFixture<AjustesTerminarPeriodoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesTerminarPeriodoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesTerminarPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
