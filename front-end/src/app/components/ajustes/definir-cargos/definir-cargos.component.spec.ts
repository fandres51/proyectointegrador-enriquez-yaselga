import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DefinirCargosComponent } from './definir-cargos.component';

describe('DefinirCargosComponent', () => {
  let component: DefinirCargosComponent;
  let fixture: ComponentFixture<DefinirCargosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefinirCargosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefinirCargosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
