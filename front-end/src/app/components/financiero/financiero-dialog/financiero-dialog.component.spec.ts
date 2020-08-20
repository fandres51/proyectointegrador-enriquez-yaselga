import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinancieroDialogComponent } from './financiero-dialog.component';

describe('FinancieroDialogComponent', () => {
  let component: FinancieroDialogComponent;
  let fixture: ComponentFixture<FinancieroDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinancieroDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinancieroDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
