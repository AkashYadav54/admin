import { TestBed } from '@angular/core/testing';

import { CouponCodeService } from './coupon-code.service';

describe('CouponCodeService', () => {
  let service: CouponCodeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CouponCodeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
