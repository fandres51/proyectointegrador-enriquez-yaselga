import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoridadEditComponent } from './autoridad-edit.component';

describe('AutoridadEditComponent', () => {
  let component: AutoridadEditComponent;
  let fixture: ComponentFixture<AutoridadEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoridadEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoridadEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
