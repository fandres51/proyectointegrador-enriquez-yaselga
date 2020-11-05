import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosNuevoComponent } from './contratos-nuevo.component';

describe('ContratosNuevoComponent', () => {
  let component: ContratosNuevoComponent;
  let fixture: ComponentFixture<ContratosNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
