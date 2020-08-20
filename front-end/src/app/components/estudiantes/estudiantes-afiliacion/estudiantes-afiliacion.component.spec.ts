import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesAfiliacionComponent } from './estudiantes-afiliacion.component';

describe('EstudiantesAfiliacionComponent', () => {
  let component: EstudiantesAfiliacionComponent;
  let fixture: ComponentFixture<EstudiantesAfiliacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesAfiliacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesAfiliacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
