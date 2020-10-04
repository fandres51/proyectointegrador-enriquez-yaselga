import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadFormComponent } from './autoridad-form.component';

describe('AutoridadFormComponent', () => {
  let component: AutoridadFormComponent;
  let fixture: ComponentFixture<AutoridadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoridadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoridadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
