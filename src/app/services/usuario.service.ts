import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthStateService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = 'https://findeebackend.onrender.com/api/findee/usuario';

  constructor(private http: HttpClient, private authState: AuthStateService) { }

  //Crear el header con el token de JWT que se obtiene del servicio de autenticación
  private getHeaders() {
    const token = this.authState.getToken();
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
    };
  }

  //Método para peticion de actualización de datos de usuario
  actualizarUsuario(id: number, datos: any): Observable<any> {
    return this.http.put(`${this.apiUrl}`, datos, this.getHeaders());
  }

  //Metodo para peticion de actualización de CV
  actualizarCV(id: number, file: File): Observable<any> {
    const formData = new FormData();
    formData.append('cvFile', file);
    
    return this.http.put(`${this.apiUrl}/cv`, formData, this.getHeaders());
    
  }

  //Metodo para peticion de obtención de datos de usuario
  obtenerUsuario(): Observable<any> {
    return this.http.get(`${this.apiUrl}`, this.getHeaders());
  }
}