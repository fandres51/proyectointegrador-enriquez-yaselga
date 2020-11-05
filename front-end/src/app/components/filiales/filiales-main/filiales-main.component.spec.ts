import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilialesMainComponent } from './filiales-main.component';

describe('FilialesMainComponent', () => {
  let component: FilialesMainComponent;
  let fixture: ComponentFixture<FilialesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilialesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilialesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
