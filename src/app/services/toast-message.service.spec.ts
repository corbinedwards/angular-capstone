import { TestBed } from '@angular/core/testing';

import { ToastMessageService } from './toast-message.service';

describe('ToastMessageServiceService', () => {
  let service: ToastMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ToastMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
