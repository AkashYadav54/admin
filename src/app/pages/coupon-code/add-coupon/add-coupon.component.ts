import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CouponCodeService } from '../../../services/coupon-code/coupon-code.service';

@Component({
  selector: 'app-add-coupon',
  standalone: false,
  templateUrl: './add-coupon.component.html',
  styleUrls: ['./add-coupon.component.scss']
})
export class AddCouponComponent {
  coupon: any = { couponCode: '', percentageOff: 0, expiresOn: '', valid: false, couponNotExpired: false };

  constructor(private couponService: CouponCodeService, private router: Router) {}

  addCoupon() {
    this.couponService.addCoupon(this.coupon).subscribe((newCoupon) => {
      // Optionally navigate back to the coupon list or show a success message
      this.router.navigate(['/coupon']);
    });
  }

  goBack() {
    this.router.navigate(['/coupons']);
  }
}
