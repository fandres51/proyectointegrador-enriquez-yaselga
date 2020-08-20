import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesListarComponent } from './estudiantes-listar.component';

describe('EstudiantesListarComponent', () => {
  let component: EstudiantesListarComponent;
  let fixture: ComponentFixture<EstudiantesListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
