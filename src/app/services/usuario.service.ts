import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'http://localhost:8080/api/findee/usuario';

  constructor(private http: HttpClient, private authState: AuthStateService) { }

  private getHeaders() {
    const token = this.authState.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  actualizarUsuario(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, datos, this.getHeaders());
  }

  actualizarCV(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('cvFile', file);
    
    return this.http.put(`${this.apiUrl}/cv`, formData, this.getHeaders());
    
  }

  obtenerUsuario(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, this.getHeaders());
  }
}