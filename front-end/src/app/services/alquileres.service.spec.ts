import { TestBed } from '@angular/core/testing';

import { AlquileresService } from './alquileres.service';

describe('AlquileresService', () => {
  let service: AlquileresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AlquileresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
