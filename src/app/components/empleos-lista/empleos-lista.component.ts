import { Component } from '@angular/core';
import Empleo from '../../models/Empleo';
import { CardEmpleoComponent } from '../card-empleo/card-empleo.component';
import { CommonModule } from '@angular/common';
import { EmpleoService } from '../../services/empleo.service';
import { FiltrosComponent } from "../filtros/filtros.component";

@Component({
  selector: 'app-empleos-lista',
  imports: [CardEmpleoComponent, CommonModule, FiltrosComponent],
  templateUrl: './empleos-lista.component.html',
  styleUrl: './empleos-lista.component.css'
})
export class EmpleosListaComponent {



  empleos: Empleo[] = []; 
  currentPage: number = 0;
  pageSize: number = 10;
  totalPages: number = 0;
  totalEmpleos: number = 0;
  filtrosActuales: any = {};

  constructor(private empleoService: EmpleoService){}

  ngOnInit() {
    this.cargarEmpleos();
  }


  //LLamada a la API para traerse los empleos de forma paginada
  cargarEmpleos(): void {
    this.empleoService.getEmpleosPaginados(
      this.currentPage, 
      this.pageSize, 
      this.filtrosActuales
    ).subscribe({
      next: (response) => {
        if (response.content && response.content.length > 0) {
          this.empleos = response.content;
          this.totalPages = response.totalPages;
          this.totalEmpleos = response.totalElements;
        } else {
          this.empleos = [];
        }
      },
      error: (error) => {
        console.error('Error al cargar los empleos:', error);
      }
    });
  }

  // Método para manejar el cambio de página
  onPageChange(page: number): void {
    this.currentPage = page;
    this.cargarEmpleos();
  }


  //Método para manejar el paginado, es decir, el numero de botones que apareceran en la paginación para evitar que se generen todos los botones en caso de que haya muchos empleos
  getVisiblePages(): number[] {
    const visiblePages = 3; // Número de botones visibles en la paginación
    const pages: number[] = [];

    if (this.totalPages <= visiblePages + 1) {
      // Si hay pocas páginas, las mostramos todas
      for (let i = 0; i < this.totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(0, this.currentPage - Math.floor(visiblePages / 2));
      let endPage = startPage + visiblePages;

      // Ajuste si el final excede el total
      if (endPage > this.totalPages) {
        endPage = this.totalPages;
        startPage = Math.max(0, endPage - visiblePages);
      }

      for (let i = startPage; i < endPage; i++) {
        pages.push(i);
      }
    }

    return pages;
  }

  // Añade este método para manejar los filtros
onFiltrosChange(filtros: any): void {
  console.log('Filtros recibidos:', filtros); // Debug
  this.filtrosActuales = this.prepararFiltros(filtros);
  this.currentPage = 0;
  this.cargarEmpleos();
}
  // Método mejorado para preparar filtros
  prepararFiltros(filtros: any): any {
    const filtrosPreparados: any = {};
    
    // Procesar arrays (checkbox)
    const arrayFields = ['tipoEmpleo', 'tipoContrato', 'tipoJornada', 'categoriaTrabajo'];
    arrayFields.forEach(key => {
      if (filtros[key] && filtros[key].length > 0) {
        filtrosPreparados[key] = Array.isArray(filtros[key]) 
          ? filtros[key].join(',') 
          : filtros[key];
      }
    });
    
    // Procesar ciudad (string)
    if (filtros.ciudad && filtros.ciudad.trim() !== '') {
      filtrosPreparados.ciudad = filtros.ciudad;
    }
    
    console.log('Filtros preparados:', filtrosPreparados); // Debug
    return filtrosPreparados;
  }
}
