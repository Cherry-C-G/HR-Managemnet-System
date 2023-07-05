import { TestBed } from '@angular/core/testing';

import { VisaStatusGuard } from './visa-status.guard';

describe('VisaStatusGuard', () => {
  let guard: VisaStatusGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VisaStatusGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
