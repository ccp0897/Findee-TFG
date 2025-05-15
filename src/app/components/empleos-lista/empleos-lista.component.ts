import { Component } from '@angular/core';
import Empleo from '../../models/Empleo';
import { CardEmpleoComponent } from '../card-empleo/card-empleo.component';
import { CommonModule } from '@angular/common';
import { EmpleoService } from '../../services/empleo.service';

@Component({
  selector: 'app-empleos-lista',
  imports: [CardEmpleoComponent, CommonModule],
  templateUrl: './empleos-lista.component.html',
  styleUrl: './empleos-lista.component.css'
})
export class EmpleosListaComponent {



  empleos: Empleo[] = [];
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalEmpleos: number = 0;

  constructor(private empleoService: EmpleoService){}

  ngOnInit() {
    this.cargarEmpleos();
  }


  //LLamada a la API para traerse los empleos de forma paginada
  cargarEmpleos(): void {
  this.empleoService.getEmpleosPaginados(this.currentPage, this.pageSize).subscribe({
    next: (response) => {
      console.log('Respuesta completa:', response); // Debug
      if (response.content && response.content.length > 0) {
        this.empleos = response.content;
        console.log('Primer empleo:', this.empleos[0]); // Debug detallado
        this.totalPages = response.totalPages;
        this.totalEmpleos = response.totalElements;
      } else {
        console.warn('La respuesta no contiene empleos');
        this.empleos = [];
      }
    },
    error: (error) => {
      console.error('Error al cargar los empleos:', error);
      // Opcional: Mostrar mensaje al usuario
    }
  });
}

  onPageChange(page: number): void {
    this.currentPage = page;
    this.cargarEmpleos();
  }
}
