import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContratosMainComponent } from './contratos-main.component';

describe('ContratosMainComponent', () => {
  let component: ContratosMainComponent;
  let fixture: ComponentFixture<ContratosMainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContratosMainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContratosMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
