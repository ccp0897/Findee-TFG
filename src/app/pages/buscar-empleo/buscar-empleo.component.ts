import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-buscar-empleo',
  imports: [HeaderComponent, FooterComponent],
  templateUrl: './buscar-empleo.component.html',
  styleUrl: './buscar-empleo.component.css'
})
export class BuscarEmpleoComponent {

}
