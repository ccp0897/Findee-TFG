import { Injectable } from '@angular/core';

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
}