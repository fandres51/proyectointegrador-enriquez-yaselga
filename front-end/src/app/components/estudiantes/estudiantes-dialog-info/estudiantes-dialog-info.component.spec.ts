import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstudiantesDialogInfoComponent } from './estudiantes-dialog-info.component';

describe('EstudiantesDialogInfoComponent', () => {
  let component: EstudiantesDialogInfoComponent;
  let fixture: ComponentFixture<EstudiantesDialogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstudiantesDialogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstudiantesDialogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
