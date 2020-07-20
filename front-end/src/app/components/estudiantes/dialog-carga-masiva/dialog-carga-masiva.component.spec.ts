import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCargaMasivaComponent } from './dialog-carga-masiva.component';

describe('DialogCargaMasivaComponent', () => {
  let component: DialogCargaMasivaComponent;
  let fixture: ComponentFixture<DialogCargaMasivaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogCargaMasivaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogCargaMasivaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
