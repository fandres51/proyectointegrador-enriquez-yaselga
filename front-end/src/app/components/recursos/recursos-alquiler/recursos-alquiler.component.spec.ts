import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosAlquilerComponent } from './recursos-alquiler.component';

describe('RecursosAlquilerComponent', () => {
  let component: RecursosAlquilerComponent;
  let fixture: ComponentFixture<RecursosAlquilerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosAlquilerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
