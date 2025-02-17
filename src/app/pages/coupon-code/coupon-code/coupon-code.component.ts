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

  expiredCoupon() {
    this.router.navigate(['expired-coupon']);
   }

  // Delete coupon
  deleteCoupon(couponCode: string) {
    this.couponService.deleteCoupon(couponCode).subscribe(
      () => {
        // After successful deletion, remove the coupon from the list
        this.coupons = this.coupons.filter(coupon => coupon.couponCode !== couponCode);
  
        // Show success message
        this.snackBar.open('Coupon deleted successfully!', 'Close', {
          duration: 3000,
          panelClass: ['success-snackbar'],
        });
      },
      (error) => {
        // Handle error if coupon deletion fails
        console.error('Error deleting coupon:', error);  // Log the error to the console
  
        // Show error message
        this.snackBar.open('Error deleting coupon. Please try again.', 'Close', {
          duration: 3000,
          panelClass: ['error-snackbar'],
        });
      }
    );
  }
  

  // Update coupon
  updateCoupon(couponCode: string) { 
    this.snackBar.open('Redirecting... to Coupon Update', 'Close', {
      duration: 2000,
      panelClass: ['success-snackbar'],
    });
    this.router.navigate([`update-coupon/${couponCode}`]);
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
