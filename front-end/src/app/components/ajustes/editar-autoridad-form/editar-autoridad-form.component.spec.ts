import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarAutoridadFormComponent } from './editar-autoridad-form.component';

describe('EditarAutoridadFormComponent', () => {
  let component: EditarAutoridadFormComponent;
  let fixture: ComponentFixture<EditarAutoridadFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditarAutoridadFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarAutoridadFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
