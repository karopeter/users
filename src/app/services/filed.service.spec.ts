import { TestBed } from '@angular/core/testing';

import { FiledService } from './filed.service';

describe('FiledService', () => {
  let service: FiledService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FiledService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
