import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilialesCrearComponent } from './filiales-crear.component';

describe('FilialesCrearComponent', () => {
  let component: FilialesCrearComponent;
  let fixture: ComponentFixture<FilialesCrearComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilialesCrearComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilialesCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
