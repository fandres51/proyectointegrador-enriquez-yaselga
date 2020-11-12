import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesMainComponent } from './notificaciones-main.component';

describe('NotificacionesMainComponent', () => {
  let component: NotificacionesMainComponent;
  let fixture: ComponentFixture<NotificacionesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
