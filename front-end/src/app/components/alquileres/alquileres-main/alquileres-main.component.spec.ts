import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquileresMainComponent } from './alquileres-main.component';

describe('AlquileresMainComponent', () => {
  let component: AlquileresMainComponent;
  let fixture: ComponentFixture<AlquileresMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlquileresMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlquileresMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
