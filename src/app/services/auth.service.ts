import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStateService {
  // Variables globales accesibles desde cualquier componente
  isLoggedIn: boolean = false;
  email: string = '';

  // Métodos básicos para modificar el estado
  login(username: string) {
    this.isLoggedIn = true;
    this.email = username;
  }

  logout() {
    this.isLoggedIn = false;
    this.email = '';
  }

  //Comienzo del uso de la API

  //URL de la API
  private apiAuthUrl = "http://localhost:8080/api/auth/";

  constructor(private http: HttpClient) { }

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