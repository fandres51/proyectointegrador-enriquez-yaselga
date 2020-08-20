import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesNuevoSemestreComponent } from './ajustes-nuevo-semestre.component';

describe('AjustesNuevoSemestreComponent', () => {
  let component: AjustesNuevoSemestreComponent;
  let fixture: ComponentFixture<AjustesNuevoSemestreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesNuevoSemestreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesNuevoSemestreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
