import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosDialogInfoComponent } from './recursos-dialog-info.component';

describe('RecursosDialogInfoComponent', () => {
  let component: RecursosDialogInfoComponent;
  let fixture: ComponentFixture<RecursosDialogInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosDialogInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosDialogInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
