import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CouponCodeService {

  private apiUrl = 'https://backend.theantriksha.com/v1/coupons';

  constructor(private http: HttpClient) {}

  // Helper function to get the token (you can customize this to fetch from your storage or auth service)
  private getAccessToken(): string {
    // Assuming the token is stored in localStorage. Change this as needed.
    return localStorage.getItem('authToken') || '';
  }

  // Method to get the Authorization headers
  private getAuthHeaders() {
    const accessToken = this.getAccessToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    });
  }

  // Add a coupon (POST)
  addCoupon(coupon: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post<any>(this.apiUrl, coupon, { headers });
  }

  // Get all coupons (GET)
  getCoupons(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  
  getExpiredCoupons(): Observable<any[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<any[]>(`${this.apiUrl}/expired`, { headers });
  }

  // Get coupon by ID (GET)
  getCouponById(couponCode: string): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get<any>(`${this.apiUrl}/${couponCode}`, { headers });
  }

  // Update coupon (PUT)
  updateCoupon(id: string, coupon: any): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put<any>(`${this.apiUrl}/${id}`, coupon, { headers });
  }

  // Delete coupon (DELETE)
  deleteCoupon(id: string): Observable<void> {
    const headers = this.getAuthHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

}
