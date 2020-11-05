import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesFiltrosComponent } from './estudiantes-filtros.component';

describe('EstudiantesFiltrosComponent', () => {
  let component: EstudiantesFiltrosComponent;
  let fixture: ComponentFixture<EstudiantesFiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesFiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
