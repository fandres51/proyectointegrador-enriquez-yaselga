import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltrosFinancieroComponent } from './filtros-financiero.component';

describe('FiltrosFinancieroComponent', () => {
  let component: FiltrosFinancieroComponent;
  let fixture: ComponentFixture<FiltrosFinancieroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FiltrosFinancieroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FiltrosFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
