import { Component, EventEmitter, Input, Output } from '@angular/core';
import Empleo from '../../models/Empleo';
import { CommonModule } from '@angular/common';
import { FavoritoService } from '../../services/favorito.service';
import { AuthStateService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { EmpleoDetallePopUpComponent } from '../empleo-detalle-pop-up/empleo-detalle-pop-up.component';

@Component({
  selector: 'app-card-empleo',
  imports: [CommonModule, EmpleoDetallePopUpComponent],
  templateUrl: './card-empleo.component.html',
  styleUrl: './card-empleo.component.css'
})
export class CardEmpleoComponent {

  @Input() empleo!: Empleo;
  esFavorito: boolean = false;
  estaLogueado: boolean = false;
  mostrarPopUp: boolean = false;
  @Output() favoritoCambiado = new EventEmitter<number>();

  constructor(private favoritoService: FavoritoService, private authState: AuthStateService, private router: Router){}

  
  ngOnInit() {
    this.estaLogueado = this.authState.isLoggedIn;
    if (this.estaLogueado) {
      this.verificarFavorito();
    }
  }

  //Metodo ver si el empleo esta en favoritos y que aparezca marcado
  verificarFavorito(): void {

    this.favoritoService.verificarFavorito(this.empleo.id).subscribe({
      next: (esFavorito) => {
        this.esFavorito = esFavorito;

      },
      error: (err) => {
        console.error('Error al verificar favorito', err);
      }
    });

  }


  //Metodo para cuando se hace click en el icono de favorito
  //Se guarde el empleo en los favoritos de la base de datos
  //Para ese usuario
  toggleGuardado() {
    if(!this.estaLogueado){
      this.router.navigate(['/login']);
      return;
    }
 
    if(this.esFavorito) {
      this.favoritoService.deleteFavorito(this.empleo.id).subscribe({
        next: () => {
          this.esFavorito = false;
          this.favoritoCambiado.emit(this.empleo.id);
        },
        error: (error) => {
          console.error('Error al eliminar el favorito:', error);
        }
      });
    } else {
      this.favoritoService.addFavorito(this.empleo.id).subscribe({
        next: () => {
          this.esFavorito = true;
          
          
        },
        error: (error) => {
          console.error('Error al agregar el favorito:', error);
        }
      });
    }

  }
  //Comprobacion de si elementos estan vacios o no dan valor
  getDisplayCity(city: string): string {
    return city === 'null' ? 'Ciudad desconocida' : city;
  }

  getDisplayContractType(contractType: string): string {
    return contractType === 'null' ? 'Tipo de contrato no especificado' : contractType;
  }

  getDisplayWorkday(workday: string): string {
    return workday === 'null' ? 'Jornada desconocida' : workday;
  }

  getDisplayRemote(remote: string): string {
    return remote === 'null' ? 'Modalidad no especificada' : remote;
  }

  getDisplaySalary(salaryMin: number, salaryMax: number): string {
    if (salaryMin === 0.00 || salaryMax === 0.00) {
      return 'Salario no especificado';
    }
    return `${salaryMin}€ - ${salaryMax}€`;
  }


  //Metodo para abrir el pop up de detalles
  abrirDetalleEmpleo(){
    this.mostrarPopUp = true;
  }

  //Metodo para cerrar el pop up de detalles
  cerrarPopUp(){
    this.mostrarPopUp = false;
  }


  // Método para manejar la aplicación
  onAplicar(url: string) {
    window.open(url, '_blank');
  }
}
