import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosActualizacionComponent } from './recursos-actualizacion.component';

describe('RecursosActualizacionComponent', () => {
  let component: RecursosActualizacionComponent;
  let fixture: ComponentFixture<RecursosActualizacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosActualizacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosActualizacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
