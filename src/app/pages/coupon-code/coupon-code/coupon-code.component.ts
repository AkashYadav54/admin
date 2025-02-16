import { Component } from '@angular/core';
import { CouponCodeService } from '../../../services/coupon-code/coupon-code.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-coupon-code',
  standalone: false,
  
  templateUrl: './coupon-code.component.html',
  styleUrl: './coupon-code.component.scss'
})
export class CouponCodeComponent {
coupons: any[] = []; // No interface, just use any
  coupon: any = { code: '', discount: 0, description: '' };

  constructor(private couponService: CouponCodeService, private router:Router,
     private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadCoupons();
  }

  // Load all coupons
  loadCoupons() {
    this.couponService.getCoupons().subscribe((data) => {
      this.coupons = data;
      console.log(this.coupons)
    });
  }

  // Add coupon
  addCoupon() {
   this.router.navigate(['add-coupon']);
  }

  // Delete coupon
  deleteCoupon(couponCode: string) {
    this.couponService.deleteCoupon(couponCode).subscribe(() => {
      this.coupons = this.coupons.filter(coupon => coupon.couponCode !== couponCode);
      this.snackBar.open('Coupon deleted successfully!', 'Close', {
        duration: 3000,
        panelClass: ['success-snackbar'],
      });
    });
  }

  // Update coupon
  updateCoupon(couponCode: string) { 
    this.snackBar.open('Redirecting... to Coupon Update', 'Close', {
      duration: 2000,
      panelClass: ['success-snackbar'],
    });
    this.router.navigate([`update-coupon/${couponCode}`]);
  }
  
}
