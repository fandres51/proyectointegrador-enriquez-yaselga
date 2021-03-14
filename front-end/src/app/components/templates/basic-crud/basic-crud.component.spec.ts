import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicCrudComponent } from './basic-crud.component';

describe('BasicCrudComponent', () => {
  let component: BasicCrudComponent;
  let fixture: ComponentFixture<BasicCrudComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BasicCrudComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BasicCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
