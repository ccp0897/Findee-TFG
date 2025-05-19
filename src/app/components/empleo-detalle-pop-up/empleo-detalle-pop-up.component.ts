import { Component, EventEmitter, Input, Output } from '@angular/core';
import Empleo from '../../models/Empleo';

@Component({
  selector: 'app-empleo-detalle-pop-up',
  imports: [],
  templateUrl: './empleo-detalle-pop-up.component.html',
  styleUrl: './empleo-detalle-pop-up.component.css'
})
export class EmpleoDetallePopUpComponent {

  @Input() empleo!: Empleo;
  @Input() esFavorito: boolean = false;
  @Output() cerrarPopUp = new EventEmitter<void>();
  @Output() toggleFavorito = new EventEmitter<void>();
  @Output() aplicar = new EventEmitter<string>();


  onAplicar(){
    console.log("Has hecho click en aplicar");
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

}
