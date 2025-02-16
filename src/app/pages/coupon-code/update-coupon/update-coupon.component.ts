import { Component } from '@angular/core';
import { CouponCodeService } from '../../../services/coupon-code/coupon-code.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-coupon',
  standalone: false,
  templateUrl: './update-coupon.component.html',
  styleUrl: './update-coupon.component.scss'
})
export class UpdateCouponComponent {

  coupon: any = {
    couponCode: '',
    percentageOff: 0,
    description: '',
    expiresOn: '',
    valid: true,
    couponNotExpired: true
  };
  couponCode!: string;

  constructor(
    private couponService: CouponCodeService,
    private route: ActivatedRoute,
    private router: Router,
     private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    // Get couponCode from the route params
    this.couponCode = this.route.snapshot.paramMap.get('couponCode')!;
    if (this.couponCode) {
      this.couponService.getCouponById(this.couponCode).subscribe((data) => {
        this.coupon = data;
      });
    }
  }

  updateCoupon() {
    this.couponService.updateCoupon(this.couponCode, this.coupon).subscribe(
      (updatedCoupon) => {
        // Success Snackbar
        this.snackBar.open('Coupon updated successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
        this.router.navigate(['/coupon']);
      },
      (error) => {
        // Error Snackbar
        this.snackBar.open('Failed to update coupon. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
        console.error('Error updating coupon:', error);  // Log error to the console
      }
    );
  }
}
