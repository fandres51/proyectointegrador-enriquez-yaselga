import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadesMainComponent } from './autoridades-main.component';

describe('AutoridadesMainComponent', () => {
  let component: AutoridadesMainComponent;
  let fixture: ComponentFixture<AutoridadesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoridadesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoridadesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
