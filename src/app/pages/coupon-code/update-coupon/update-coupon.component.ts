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

  coupon: any 
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

    this.couponService.updateCoupon(this.couponCode, couponToSend ).subscribe(
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

  back(){
    this.router.navigate(['/coupon']);
  }
}
