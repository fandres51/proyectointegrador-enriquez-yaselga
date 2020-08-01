import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventosMainComponent } from './eventos-main.component';

describe('EventosMainComponent', () => {
  let component: EventosMainComponent;
  let fixture: ComponentFixture<EventosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventosMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
