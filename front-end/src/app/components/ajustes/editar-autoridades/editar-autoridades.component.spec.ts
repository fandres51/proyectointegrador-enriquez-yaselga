import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAutoridadesComponent } from './editar-autoridades.component';

describe('EditarAutoridadesComponent', () => {
  let component: EditarAutoridadesComponent;
  let fixture: ComponentFixture<EditarAutoridadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAutoridadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAutoridadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
