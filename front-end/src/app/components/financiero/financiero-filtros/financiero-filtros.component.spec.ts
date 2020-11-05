import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancieroFiltrosComponent } from './financiero-filtros.component';

describe('FinancieroFiltrosComponent', () => {
  let component: FinancieroFiltrosComponent;
  let fixture: ComponentFixture<FinancieroFiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancieroFiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancieroFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
