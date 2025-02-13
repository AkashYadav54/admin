import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrdersService {
  private baseUrl = 'https://backend.theantriksha.com/v1/orders';

  constructor(private http: HttpClient) {}

  // Get the access token from local storage
  private getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Create a method to generate headers with the auth token
  private createHeaders(): HttpHeaders {
    const token = this.getAuthToken();
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  }

  // Fetch all orders
  getOrders(): Observable<any> {
    const headers = this.createHeaders();
    return this.http.get(this.baseUrl, { headers });
  }

  // Add a new order
  createOrder(orderData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.post(this.baseUrl, orderData, { headers });
  }

  // Update an existing order
  updateOrder(orderId: string, orderData: any): Observable<any> {
    const headers = this.createHeaders();
    return this.http.put(`${this.baseUrl}/${orderId}`, orderData, { headers });
  }

  // Delete an order
  deleteOrder(orderId: string): Observable<any> {
    const headers = this.createHeaders();
    return this.http.delete(`${this.baseUrl}/${orderId}`, { headers });
  }
}
