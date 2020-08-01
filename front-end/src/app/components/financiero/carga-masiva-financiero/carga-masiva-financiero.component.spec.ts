import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaMasivaFinancieroComponent } from './carga-masiva-financiero.component';

describe('CargaMasivaFinancieroComponent', () => {
  let component: CargaMasivaFinancieroComponent;
  let fixture: ComponentFixture<CargaMasivaFinancieroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CargaMasivaFinancieroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CargaMasivaFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
