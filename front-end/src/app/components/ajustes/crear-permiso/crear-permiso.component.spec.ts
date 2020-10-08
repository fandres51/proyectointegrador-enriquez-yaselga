import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPermisoComponent } from './crear-permiso.component';

describe('CrearPermisoComponent', () => {
  let component: CrearPermisoComponent;
  let fixture: ComponentFixture<CrearPermisoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPermisoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPermisoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
