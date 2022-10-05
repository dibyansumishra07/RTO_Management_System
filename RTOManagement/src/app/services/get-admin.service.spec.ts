import { TestBed } from '@angular/core/testing';

import { GetAdminService } from './get-admin.service';

describe('GetAdminService', () => {
  let service: GetAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
