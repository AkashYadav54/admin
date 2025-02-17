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
    // 1. Get the local date and time components
    const localDate = new Date(this.coupon.expiresOn); // Your existing Date object

    const year = localDate.getFullYear();
    const month = localDate.getMonth(); // 0-indexed (January is 0)
    const day = localDate.getDate();
    const hours = localDate.getHours()-5;
    const minutes = localDate.getMinutes()-30;
    const seconds = localDate.getSeconds(); // Optional, but good practice to include

    // 2. Create a *new* Date object using UTC components
    const utcDate = new Date(Date.UTC(year, month, day, hours, minutes, seconds));

    // 3. Convert the *UTC* Date object to an ISO string
    const utcDateString = utcDate.toISOString();

    // 4. Create a new coupon object with the UTC date string
    const couponToSend = { ...this.coupon };
    couponToSend.expiresOn = utcDateString;

    // 5. Send the coupon
    this.couponService.addCoupon(couponToSend).subscribe({
        next: (newCoupon) => {
            console.log('Coupon added successfully:', newCoupon);
            this.router.navigate(['/coupon']);
        },
        error: (error) => {
            console.error('Error adding coupon:', error);
        }
    });
}

  goBack() {
    this.router.navigate(['/coupon']);
  }
}
