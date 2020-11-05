import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquileresCrearComponent } from './alquileres-crear.component';

describe('AlquileresCrearComponent', () => {
  let component: AlquileresCrearComponent;
  let fixture: ComponentFixture<AlquileresCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquileresCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlquileresCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
