import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadesComponent } from './autoridades.component';

describe('AutoridadesComponent', () => {
  let component: AutoridadesComponent;
  let fixture: ComponentFixture<AutoridadesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoridadesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoridadesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
