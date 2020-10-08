import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EleccionesMainComponent } from './elecciones-main.component';

describe('EleccionesMainComponent', () => {
  let component: EleccionesMainComponent;
  let fixture: ComponentFixture<EleccionesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EleccionesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EleccionesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
