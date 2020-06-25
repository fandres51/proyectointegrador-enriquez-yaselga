import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarFinancieroComponent } from './listar-financiero.component';

describe('ListarFinancieroComponent', () => {
  let component: ListarFinancieroComponent;
  let fixture: ComponentFixture<ListarFinancieroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarFinancieroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
