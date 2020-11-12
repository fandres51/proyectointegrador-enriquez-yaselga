import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquileresEditarComponent } from './alquileres-editar.component';

describe('AlquileresEditarComponent', () => {
  let component: AlquileresEditarComponent;
  let fixture: ComponentFixture<AlquileresEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquileresEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlquileresEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
