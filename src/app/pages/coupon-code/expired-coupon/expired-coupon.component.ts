import { Component } from '@angular/core';
import { CouponCodeService } from '../../../services/coupon-code/coupon-code.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-expired-coupon',
  standalone: false,
  
  templateUrl: './expired-coupon.component.html',
  styleUrl: './expired-coupon.component.scss'
})
export class ExpiredCouponComponent {
  coupons: any[] = [];
  expiredCoupon: any[] = [];

  constructor(private couponService: CouponCodeService,private router:Router,
      private snackBar: MatSnackBar
  ) { }
  ngOnInit(): void {

    this.loadExpiredCoupon();

  }

  loadExpiredCoupon() {
    console.log('Fetching expired coupons...');
    this.couponService.getExpiredCoupons().subscribe(
      (data) => {
        console.log('Data received:', data);  // Log the data received from API
        this.expiredCoupon = data;
        console.log('Expired Coupons:', this.expiredCoupon);
      },
      (error) => {
        console.error('Error fetching expired coupons:', error);  // Log any error
      }
    );
  }
  back(){
    this.router.navigate(['/coupon']);
  }
  deleteCoupon(couponCode: string) {
    this.couponService.deleteCoupon(couponCode).subscribe(() => {
      this.coupons = this.coupons.filter(coupon => coupon.couponCode !== couponCode);
      this.loadExpiredCoupon();
      this.snackBar.open('Coupon deleted successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
      });
    });
  }
  convertToIST(date: string | Date | null | undefined): string | null {  // Improved type handling
    if (!date) { return null; } // Handle null or undefined values

    const utcDate = typeof date === 'string' ? new Date(date) : date instanceof Date ? date : new Date(date); // Handle string or Date input

    if (isNaN(utcDate.getTime())) {
      return 'Invalid Date'; // Handle invalid dates
    }

    const istDate = utcDate.toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      hour12: true,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    return istDate;
  }
}
