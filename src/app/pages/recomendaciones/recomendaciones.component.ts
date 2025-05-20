import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RecomendacionComponent } from "../../components/recomendacion/recomendacion.component";

@Component({
  selector: 'app-recomendaciones',
  imports: [HeaderComponent, FooterComponent, RecomendacionComponent],
  templateUrl: './recomendaciones.component.html',
  styleUrl: './recomendaciones.component.css'
})
export class RecomendacionesComponent {

}
