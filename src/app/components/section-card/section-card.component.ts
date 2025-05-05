import { Component } from '@angular/core';
import { CardComponent } from "../card/card.component";
import Card from '../../models/Card';

@Component({
  selector: 'app-section-card',
  imports: [CardComponent],
  templateUrl: './section-card.component.html',
  styleUrl: './section-card.component.css'
})
export class SectionCardComponent {
  cards: Card[] = [
    {
      img: 'icons/searchAlternativo.svg',
      title: 'Búsqueda inteligente',
      description: 'Encuentra ofertas según tus habilidades reales.',
    },
    {
      img: 'icons/brain.svg',
      title: 'IA que te entiende',
      description: 'Recomendaciones personalizadas gracias a modelos de inteligencia artificial.',
    },
    {
      img: 'icons/Abilities.svg',
      title: 'Tus habilidades y tecnologías',
      description: 'Filtra por tus habilidades, concocmientos y otras muchas opciones.',
    },
    {
      img: 'icons/uploadCV.svg',
      title: 'CV en un clic',
      description: 'Sube tu perfil y aplica a las ofertas en segundos.',
    },
  ];
}
