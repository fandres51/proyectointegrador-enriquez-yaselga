import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosFiltrosComponent } from './recursos-filtros.component';

describe('RecursosFiltrosComponent', () => {
  let component: RecursosFiltrosComponent;
  let fixture: ComponentFixture<RecursosFiltrosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosFiltrosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
