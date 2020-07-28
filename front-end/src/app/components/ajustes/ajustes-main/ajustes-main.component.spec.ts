import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjustesMainComponent } from './ajustes-main.component';

describe('AjustesMainComponent', () => {
  let component: AjustesMainComponent;
  let fixture: ComponentFixture<AjustesMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjustesMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjustesMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
