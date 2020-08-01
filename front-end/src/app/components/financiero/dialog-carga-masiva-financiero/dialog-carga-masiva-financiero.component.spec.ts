import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCargaMasivaFinancieroComponent } from './dialog-carga-masiva-financiero.component';

describe('DialogCargaMasivaFinancieroComponent', () => {
  let component: DialogCargaMasivaFinancieroComponent;
  let fixture: ComponentFixture<DialogCargaMasivaFinancieroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCargaMasivaFinancieroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCargaMasivaFinancieroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
