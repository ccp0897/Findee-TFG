import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { SectionCardComponent } from '../../components/section-card/section-card.component';
import { CtaEmpleoComponent } from "../../components/cta-empleo/cta-empleo.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-home',
  imports: [HeaderComponent, HeroComponent, SectionCardComponent, CtaEmpleoComponent, FooterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
