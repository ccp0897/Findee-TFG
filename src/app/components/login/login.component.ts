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
  // Variables para el formulario de inicio de sesión
  email: string = '';
  password: string = '';

  // Variable para recordar la sesión
  rememberMe: boolean = false;
  // Variable para manejar errores
  errorMessage: string | null = null;
  // Variable para mostrar/ocultar la contraseña
  showPassword: boolean = false;

  //Constructor que inyecta el servicio de autenticación y el router
  constructor(public authState: AuthStateService, private router: Router) {}

  // Método para realizar el inicio de sesión suscribiéndose al servicio de autenticación
  onSubmit() {
    this.authState.login(this.email, this.password).subscribe({
      next: () => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        
      }
    })
    
  }
  volverAtras(){
    this.router.navigate(['/']);
    this.authState.error = null;
  }


}
