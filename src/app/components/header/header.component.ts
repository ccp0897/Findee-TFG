import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { AuthStateService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
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

  logout(){
    this.authState.logout();
  }

}
