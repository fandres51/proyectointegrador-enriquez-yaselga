import { TestBed } from '@angular/core/testing';

import { CsvToFireService } from './csv-to-fire.service';

describe('CsvToFireService', () => {
  let service: CsvToFireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CsvToFireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
