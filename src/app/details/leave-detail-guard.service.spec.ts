import { TestBed } from '@angular/core/testing';

import { LeaveDetailGuardService } from './leave-detail-guard.service';

describe('LeaveDetailGuardService', () => {
  let service: LeaveDetailGuardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LeaveDetailGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
