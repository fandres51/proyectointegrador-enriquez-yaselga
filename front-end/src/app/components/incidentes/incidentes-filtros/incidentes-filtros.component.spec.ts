import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentesFiltrosComponent } from './incidentes-filtros.component';

describe('IncidentesFiltrosComponent', () => {
  let component: IncidentesFiltrosComponent;
  let fixture: ComponentFixture<IncidentesFiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentesFiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentesFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
