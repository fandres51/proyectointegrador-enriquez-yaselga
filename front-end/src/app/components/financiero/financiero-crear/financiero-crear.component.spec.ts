import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancieroCrearComponent } from './financiero-crear.component';

describe('FinancieroCrearComponent', () => {
  let component: FinancieroCrearComponent;
  let fixture: ComponentFixture<FinancieroCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancieroCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancieroCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
