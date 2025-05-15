import { TestBed } from '@angular/core/testing';

import { EmpleoService } from './empleo.service';

describe('EmpleoService', () => {
  let service: EmpleoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpleoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
