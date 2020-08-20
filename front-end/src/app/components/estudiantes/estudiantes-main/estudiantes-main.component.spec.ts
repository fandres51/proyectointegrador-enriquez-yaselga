import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesMainComponent } from './estudiantes-main.component';

describe('EstudiantesMainComponent', () => {
  let component: EstudiantesMainComponent;
  let fixture: ComponentFixture<EstudiantesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
