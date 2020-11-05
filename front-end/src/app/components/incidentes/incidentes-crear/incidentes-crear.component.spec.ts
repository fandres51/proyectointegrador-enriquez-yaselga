import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentesCrearComponent } from './incidentes-crear.component';

describe('IncidentesCrearComponent', () => {
  let component: IncidentesCrearComponent;
  let fixture: ComponentFixture<IncidentesCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentesCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
