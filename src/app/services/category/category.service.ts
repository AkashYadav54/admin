import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private apiUrl = 'https://backend.theantriksha.com/v1/categories';

  constructor(private http: HttpClient) {}

  // Get all categories
  getCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  // Add new category
  addCategory(category: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, category, { headers: this.getHeaders() });
  }

  // Delete category by ID
  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${categoryId}`, { headers: this.getHeaders() });
  }

  // Helper function to generate headers with Authorization token
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    // Return empty HttpHeaders if no token is found
    return token ? new HttpHeaders().set('Authorization', `Bearer ${token}`) : new HttpHeaders();
  }
}
