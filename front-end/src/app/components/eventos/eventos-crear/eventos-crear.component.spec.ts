import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosCrearComponent } from './eventos-crear.component';

describe('EventosCrearComponent', () => {
  let component: EventosCrearComponent;
  let fixture: ComponentFixture<EventosCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
