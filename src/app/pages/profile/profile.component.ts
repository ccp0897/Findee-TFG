import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { PerfilUsuarioComponent } from "../../components/perfil-usuario/perfil-usuario.component";

@Component({
  selector: 'app-profile',
  imports: [HeaderComponent, FooterComponent, PerfilUsuarioComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
