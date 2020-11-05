import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosListarComponent } from './recursos-listar.component';

describe('RecursosListarComponent', () => {
  let component: RecursosListarComponent;
  let fixture: ComponentFixture<RecursosListarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosListarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
