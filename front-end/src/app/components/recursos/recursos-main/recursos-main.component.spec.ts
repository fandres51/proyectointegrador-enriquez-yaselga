import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecursosMainComponent } from './recursos-main.component';

describe('RecursosMainComponent', () => {
  let component: RecursosMainComponent;
  let fixture: ComponentFixture<RecursosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecursosMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecursosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
