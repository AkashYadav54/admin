import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://backend.theantriksha.com/auth/access/token'; // API endpoint

  constructor(private http: HttpClient) {}

  // Method to handle login
  login(phoneNumber: string, password: string): Observable<any> {
    const body = {
      phoneNumber: phoneNumber, // Changed from username to phoneNumber
      password: password,
    };

    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http
      .post(this.apiUrl, body, { headers })
      .pipe(catchError(this.handleError));
  }

  // Error handling
  private handleError(error: any): Observable<never> {
    console.error('An error occurred:', error);
    throw error; // You can customize this further based on your needs.
  }
}
