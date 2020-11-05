import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilialesEditarComponent } from './filiales-editar.component';

describe('FilialesEditarComponent', () => {
  let component: FilialesEditarComponent;
  let fixture: ComponentFixture<FilialesEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilialesEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilialesEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
