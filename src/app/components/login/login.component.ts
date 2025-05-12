import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  rememberMe: boolean = false;
  constructor(private authState: AuthStateService, private router: Router) {}

  onSubmit() {
    // Lógica para manejar el envío del formulario
    console.log('Login attempt with:', {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    });
    this.onLogin();
    // Redirigir al usuario a la página de inicio después de iniciar sesión
    this.router.navigate(['/']);
  }
  onLogin() {
    // Aquí iría tu validación real con Spring
    // Por ahora simulamos un login exitoso
    this.authState.login(this.email);
    this.authState.isLoggedIn = true; // Puedes cambiar esto directamente
  }


}
