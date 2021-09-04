import { TestBed } from '@angular/core/testing';

import { User.Service.TsService } from './user.service';

describe('User.Service.TsService', () => {
  let service: User.Service.TsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(User.Service.TsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
