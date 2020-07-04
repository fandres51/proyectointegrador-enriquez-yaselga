import { TestBed } from '@angular/core/testing';

import { RecursosService } from './recursos.service';

describe('RecursosService', () => {
  let service: RecursosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecursosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
