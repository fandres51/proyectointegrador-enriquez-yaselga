import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentesListarComponent } from './incidentes-listar.component';

describe('IncidentesListarComponent', () => {
  let component: IncidentesListarComponent;
  let fixture: ComponentFixture<IncidentesListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentesListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
