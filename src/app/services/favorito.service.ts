import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthStateService } from './auth.service';
import { catchError, Observable, throwError } from 'rxjs';
import Empleo from '../models/Empleo';

@Injectable({
  providedIn: 'root'
})
export class FavoritoService {

  private apiUrl ="https://findeebackend.onrender.com/api/findee/favoritos";
  constructor(private http: HttpClient, private authState: AuthStateService) { }



  //Creacion de las cabeceras de autenticación
  //para las peticiones HTTP, utilizando el token almacenado en el servicio de autenticación
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
  //Agregar un emplea a favoritos
  addFavorito(empleoId: number): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/agregar?empleoId=${empleoId}`, 
      {}, 
      this.getAuthHeaders()
    ).pipe(
      catchError(error => {
        return throwError(() => new Error('Error al agregar favorito'));
      })
    );
  }

  //Borrar un empleo de favoritos
  deleteFavorito(empleoId: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/eliminar?empleoId=${empleoId}`,
      this.getAuthHeaders()
    ).pipe(
      catchError(error => {
        return throwError(() => new Error('Error al eliminar favorito'));
      })
    );
  }

  //Obtener los empleos favoritos del usuario
  getFavoritos(): Observable<Empleo[]> {
    return this.http.get<Empleo[]>(
      `${this.apiUrl}`,
      this.getAuthHeaders()
    ).pipe(
      catchError(error => {
        return throwError(() => new Error('Error al obtener favoritos'));
      })
    );
  }

  //Verificar si un empleo es favorito
  verificarFavorito(empleoId: number): Observable<boolean> {
    return this.http.get<boolean>(
      `${this.apiUrl}/verificar?empleoId=${empleoId}`,
      this.getAuthHeaders()
    ).pipe(
      catchError(error => {
        return throwError(() => new Error('Error al verificar favorito'));
      })
    );
  }
}
