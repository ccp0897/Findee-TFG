import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, tap, throwError } from 'rxjs';
import LoginResponse from '../models/LoginResponse';
import ErrorResponse from '../models/ErrorResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  // Variables globales accesibles desde cualquier componente
  isLoggedIn: boolean = false;
  email: string = '';
  nombre: string = '';
  error: string | null = null;

  // Métodos básicos para modificar el estado
  // login(username: string) {
  //   this.isLoggedIn = true;
  //   this.email = username;
  // }

  // logout() {
  //   this.isLoggedIn = false;
  //   this.email = '';
  // }

  //Comienzo del uso de la API

  //URL de la API
  private apiAuthUrl = "http://localhost:8080/api/auth/";

  constructor(private http: HttpClient) { }

  //Metodo para realizar el login, pasando un email y una contraseña
  //Realizar la llamada a la API, y almacenar el token en el localStorage
  login(email: string, contrasena: string): Observable<any> {
    this.error = null; // Reiniciar el error al intentar iniciar sesión
    return this.http.post<LoginResponse>(`${this.apiAuthUrl}login`, { email, contrasena }).pipe(
      tap(response => {
        if(response.success){
          this.isLoggedIn = true;
          this.email = response.email;
          this.nombre = response.nombre;
          localStorage.setItem('token', response.token);
          localStorage.setItem('userData', JSON.stringify({ email: response.email, nombre: response.nombre }));
        }
      }),
      catchError((error: HttpErrorResponse) => {
        const errorResponse = error.error as ErrorResponse;
        
        if (errorResponse.errorType === 'USER_NOT_FOUND') {
          this.error = 'No existe una cuenta con este email';
        } else if (errorResponse.errorType === 'INVALID_PASSWORD') {
          this.error = 'Contraseña incorrecta';
        } else {
          this.error = 'Error al iniciar sesión. Intente nuevamente.';
        }
        
        return throwError(() => errorResponse);
      })
    );
  }

  logout(){
    this.isLoggedIn = false;
    this.email = '';
    this.nombre = '';
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
  }



  //Método para registrar un nuevo usuario, al que se le pasa un objeto usuario y un archivo cvFile y se realiza la llamada a la API, siendo el método POST y el cuerpo
  //de la petición un FormData que contiene el objeto usuario y el archivo cvFile
  registarUsuario(usuario: any, cvFile: File): Observable<any> {
  const formData = new FormData();
  
  // Asegúrate de que el objeto usuario no contenga campos undefined
  const usuarioClean = {
    nombre: usuario.nombre,
    email: usuario.email,
    contrasena: usuario.contrasena,
    descripcion: usuario.descripcion,
    habilidades: usuario.habilidades
  };

  formData.append('usuario', JSON.stringify(usuarioClean));
  formData.append('cvFile', cvFile, cvFile.name);

  return this.http.post(`${this.apiAuthUrl}registro`, formData);
}

}