import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursoNuevoComponent } from './recurso-nuevo.component';

describe('RecursoNuevoComponent', () => {
  let component: RecursoNuevoComponent;
  let fixture: ComponentFixture<RecursoNuevoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursoNuevoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursoNuevoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
