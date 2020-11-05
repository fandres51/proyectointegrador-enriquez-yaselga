import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancieroMainComponent } from './financiero-main.component';

describe('FinancieroMainComponent', () => {
  let component: FinancieroMainComponent;
  let fixture: ComponentFixture<FinancieroMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancieroMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancieroMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
