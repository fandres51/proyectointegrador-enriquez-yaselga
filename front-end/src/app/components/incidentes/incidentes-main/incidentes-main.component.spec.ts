import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncidentesMainComponent } from './incidentes-main.component';

describe('IncidentesMainComponent', () => {
  let component: IncidentesMainComponent;
  let fixture: ComponentFixture<IncidentesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncidentesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncidentesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
