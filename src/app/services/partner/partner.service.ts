import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PartnerService {
  private apiUrl = 'https://backend.theantriksha.com/v1/partners'; // Base URL

  constructor(private http: HttpClient) {}

  // Method to get all partners with an access token
  getPartners(): Observable<any> {
    // Retrieve the access token from localStorage (or sessionStorage)
    const token = localStorage.getItem('authToken');

    // Create headers with the access token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Make the request with the authorization header
    return this.http.get<any>(this.apiUrl, { headers });
  }
}
