import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancieroListarComponent } from './financiero-listar.component';

describe('FinancieroListarComponent', () => {
  let component: FinancieroListarComponent;
  let fixture: ComponentFixture<FinancieroListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancieroListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancieroListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
