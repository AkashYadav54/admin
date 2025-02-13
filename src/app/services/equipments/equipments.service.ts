import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EquipmentsService {
  private apiUrl = 'https://backend.theantriksha.com/v1/equipments';

  constructor(private http: HttpClient) {}

  /**
   * Get all equipments
   * @returns Observable<any>
   */
  getAllEquipments(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { headers: this.getHeaders() });
  }

  getEquipmentById(id: string | number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  addEquipment(equipment: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, equipment, {
      headers: this.getHeaders(),
    });
  }

  updateEquipment(id: string | number, equipment: any): Observable<any> {
    // Correct URL construction with the equipment ID
    const url = `${this.apiUrl}/${id}`;
    console.log('Sending Equipment Update to URL:', url);

    return this.http
      .put<any>(url, equipment, {
        headers: this.getHeaders(),
      })
      .pipe(
        tap((response) => {
          console.log('Update response:', response);
        })
      );
  }

  deleteEquipment(id: string | number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('authToken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }
}
