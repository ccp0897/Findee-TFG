import { Component, Input } from '@angular/core';
import Empleo from '../../models/Empleo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-empleo',
  imports: [CommonModule],
  templateUrl: './card-empleo.component.html',
  styleUrl: './card-empleo.component.css'
})
export class CardEmpleoComponent {

  @Input() empleo!: Empleo;

  toggleGuardado() {
    this.empleo.guardado = !this.empleo.guardado;
  }
  ngOnInit() {
    console.log('Empleo recibido en tarjeta:', this.empleo); // Debug
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
