import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaTransaccionComponent } from './nueva-transaccion.component';

describe('NuevaTransaccionComponent', () => {
  let component: NuevaTransaccionComponent;
  let fixture: ComponentFixture<NuevaTransaccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NuevaTransaccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaTransaccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
