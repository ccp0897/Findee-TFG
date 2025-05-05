import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { SectionCardComponent } from '../../components/section-card/section-card.component';

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeroComponent, SectionCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
