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
          localStorage.setItem('userData', JSON.stringify({ id: response.id, email: response.email, nombre: response.nombre }));
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
  
  //Objeto usuario limpio, sin campos innecesarios
  const usuarioClean = {
    nombre: usuario.nombre,
    email: usuario.email,
    contrasena: usuario.contrasena,
    descripcion: usuario.descripcion,
    habilidades: usuario.habilidades
  };

  //Añadir los campos al FormData que será enviado a la API
  formData.append('usuario', JSON.stringify(usuarioClean));
  formData.append('cvFile', cvFile, cvFile.name);

  return this.http.post(`${this.apiAuthUrl}registro`, formData);
}

//Metodo para obtener el ID del usuario logueado
  getUserId(): number | null {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const parsedData = JSON.parse(userData);
      return parsedData.id;
    }
    return null;
  }

  //Obtener el token del localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  //Obtener los datos de usuario del localStorage
  //Si no hay datos, devuelve null
  getUserData(): any {
    const userData = localStorage.getItem('userData');
    return userData ? JSON.parse(userData) : null;
  }

  //Actualizar los datos del usuario en el localStorage
  //Recibe un objeto con los nuevos datos y los actualiza
  updateUserData(newData: any): void {
    const userData = this.getUserData();
    const updatedData = {...userData, ...newData};
    localStorage.setItem('userData', JSON.stringify(updatedData));
    this.nombre = updatedData.nombre;
  }
}