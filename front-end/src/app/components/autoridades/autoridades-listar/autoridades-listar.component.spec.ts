import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadesListarComponent } from './autoridades-listar.component';

describe('AutoridadesListarComponent', () => {
  let component: AutoridadesListarComponent;
  let fixture: ComponentFixture<AutoridadesListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoridadesListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoridadesListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
