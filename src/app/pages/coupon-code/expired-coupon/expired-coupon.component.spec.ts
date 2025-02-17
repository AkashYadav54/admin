import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredCouponComponent } from './expired-coupon.component';

describe('ExpiredCouponComponent', () => {
  let component: ExpiredCouponComponent;
  let fixture: ComponentFixture<ExpiredCouponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpiredCouponComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpiredCouponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
