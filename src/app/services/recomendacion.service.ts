import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { EmpleoRecomendado } from '../models/EmpleoRecomendado';
import { AuthStateService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class RecomendacionService {

  private apiUrl="http://localhost:8080/api/recomendaciones";

  constructor(private http: HttpClient, private authState: AuthStateService) { }


  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = this.authState.getToken();
    if (!token) {
      throw new Error('No hay token de autenticación disponible');
    }
    
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }
  getRecomendaciones(): Observable<EmpleoRecomendado[]> {
    const headers = this.getAuthHeaders();
    console.log('Headers:', headers);  // Verifica que el token se incluya
    
    return this.http.get<EmpleoRecomendado[]>(
        `${this.apiUrl}/generar`,
        this.getAuthHeaders()
    ).pipe(
        catchError((error) => {
            console.error('Error completo:', error);
            console.error('Error status:', error.status);
            console.error('Error message:', error.message);
            return throwError(() => error);
        })
    );
}
}
