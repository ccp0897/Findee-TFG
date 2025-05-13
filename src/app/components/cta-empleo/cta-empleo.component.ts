import { Component } from '@angular/core';
import { AuthStateService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cta-empleo',
  imports: [],
  templateUrl: './cta-empleo.component.html',
  styleUrl: './cta-empleo.component.css'
})
export class CtaEmpleoComponent {

  constructor(public authState: AuthStateService, private router: Router) { }

  /* Comprobar que el usuario este logueado y llevarlo a una página u otra */
  onBuscarEmpleo(): void {
    if (this.authState.isLoggedIn) {
      this.router.navigate(['/buscarempleo']);
    } else {
      this.router.navigate(['/login']);
    }
  }

}
