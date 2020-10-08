import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesCrearComponent } from './notificaciones-crear.component';

describe('NotificacionesCrearComponent', () => {
  let component: NotificacionesCrearComponent;
  let fixture: ComponentFixture<NotificacionesCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
