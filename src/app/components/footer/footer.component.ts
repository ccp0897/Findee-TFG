import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  currentYear: number = new Date().getFullYear();
  slogan: string = 'Conectamos talento con oportunidades gracias a la IA';
  email: string = 'contacto@findee.es';
  
  usefulLinks = [
    { name: 'Buscar empleo', url: '/' },
    { name: 'Políticas de privacidad', url: '/' },
    { name: 'Ayuda', url: '/' },
    { name: 'Terminos y condiciones', url: '/' }
  ];

  socialLinks = [
    { icon: '/icons/instagram 1.svg', name: 'Instagram', url: '#' },
    { icon: '/icons/twitter 1.svg', name: 'Twitter', url: '#' },
    { icon: '/icons/facebook 1.svg', name: 'Facebook', url: '#' }
  ];
}
