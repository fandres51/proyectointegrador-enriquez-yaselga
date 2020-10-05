import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificacionesEditComponent } from './notificaciones-edit.component';

describe('NotificacionesEditComponent', () => {
  let component: NotificacionesEditComponent;
  let fixture: ComponentFixture<NotificacionesEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificacionesEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificacionesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
