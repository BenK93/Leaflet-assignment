import { TestBed } from '@angular/core/testing';

import { GetLayersService } from './get-layers.service';

describe('GetLayersService', () => {
  let service: GetLayersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetLayersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
