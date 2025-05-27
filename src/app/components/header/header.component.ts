import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthStateService } from '../../services/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public authState: AuthStateService, private router: Router) { }

  // Método para navegar al login
  navigateToLogin() {
    console.log('Navigating to login');
    this.router.navigate(['/login']);
  }

  //Función para cerrar sesión
  logout() {
    this.authState.logout();
    this.router.navigate(['/login']);
  }

}
