import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authStatusSubject = new BehaviorSubject<boolean>(
    this.isAuthenticated()
  );
  authStatus$ = this.authStatusSubject.asObservable();

  constructor() {}

  isAuthenticated(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  login(token: string): void {
    localStorage.setItem('authToken', token);
    this.authStatusSubject.next(true);
  }

  logout(): void {
    localStorage.removeItem('authToken');
    this.authStatusSubject.next(false);
  }
}
