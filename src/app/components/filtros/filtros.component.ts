import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { EmpleoService } from '../../services/empleo.service';
import { debounceTime, distinctUntilChanged } from 'rxjs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-filtros',
  imports: [MatAutocompleteModule, CommonModule, MatInputModule],
  templateUrl: './filtros.component.html',
  styleUrl: './filtros.component.css'
})
export class FiltrosComponent implements OnInit{
 
  @Output() filtrosChange = new EventEmitter<any>();

  // Propiedades para los filtros
  opcionesFiltro: any = {};
  todasLasCiudades: string[] = [];
  ciudadesFiltradas: string[] = [];
  showCiudadesList: boolean = false;
  ciudadSeleccionada: string = '';
  abrirFltros: boolean = false; //Controlar el desplegable de los filtros

  // Propiedades para el formulario
  formFiltros: FormGroup;

  constructor(private empleoService: EmpleoService, private formBuilder: FormBuilder){
    this.formFiltros = this.formBuilder.group({
      tipoEmpleo: this.formBuilder.array([]),
      tipoContrato: this.formBuilder.array([]),
      tipoJornada: this.formBuilder.array([]),
      categoriaTrabajo: this.formBuilder.array([]),
      ciudad: ['']
    })
  }

  ngOnInit(): void {
      this.cargarOpcionesFiltro();
      this.onFiltrosChange();
  }

  //Funcion para obtener las opciones de los filtros se subcribe a la api
  cargarOpcionesFiltro(): void {
    this.empleoService.obtenerOpcionesFiltro().subscribe({
      next: (opciones) =>{
        this.opcionesFiltro = opciones;
        this.todasLasCiudades = opciones.ciudad || [];
        this.ciudadesFiltradas = [...this.todasLasCiudades];
      },
      error: (error) => {
        console.error('Error al cargar las opciones de filtro:', error);
      }
    })
  }

  //Funcion para manejar el cambio de los filtros, es decir, escucha los cambios en los filtros y emite el evento con los filtros seleccionados
  onFiltrosChange(): void {
    //Escuchar cambios en el formulario
    this.formFiltros.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe(() => {
      this.emitirFiltros();
    })

    //Escuchar cambios en el campo de ciudad
    this.formFiltros.get('ciudad')?.valueChanges.pipe(debounceTime(300), distinctUntilChanged()).subscribe((termino: string) => {
      this.filtrarCiudades(termino);
    });
  }

  //Funcion para filtrar las ciudades, es decir, filtra las ciudades que contienen el termino de busqueda
  // y las asigna a la propiedad ciudadesFiltradas
  filtrarCiudades(termino: string): void {
    if (!termino) {
      this.ciudadesFiltradas = [...this.todasLasCiudades];
    } else {
      this.ciudadesFiltradas = this.todasLasCiudades.filter(ciudad =>
        ciudad.toLowerCase().includes(termino.toLowerCase())
      );
    }
    this.showCiudadesList = termino?.length > 0;
  }

  //Funcion para seleccionar una ciudad, es decir, asigna el valor de la ciudad seleccionada al campo de ciudad
  selectCiudad(ciudad: string): void {
    this.ciudadSeleccionada = ciudad;
    this.formFiltros.get('ciudad')?.setValue(ciudad);
    this.showCiudadesList = false;
    this.emitirFiltros();
  }

  //Funcion para cerrar la lista de ciudades, es decir, cuando se hace click fuera de la lista de ciudades
  resetearCiudad(): void {
    this.formFiltros.get('ciudad')?.setValue('');
    this.ciudadesFiltradas = [...this.todasLasCiudades];
    this.showCiudadesList = false;
    this.emitirFiltros();
  }

  // Método para ocultar la lista con retraso
  hideCiudadesListWithDelay(): void {
    setTimeout(() => {
      this.showCiudadesList = false;
    }, 200);
  }

  //Metodo para manejar el cambio manual de la ciudad
  onCiudadInputChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const ciudad = input.value;
    
    // Verifica si la ciudad ingresada está en la lista
    if (this.todasLasCiudades.includes(ciudad)) {
      this.selectCiudad(ciudad);
    } else if (ciudad === '') {
      this.resetearCiudad();
    }
  }


  //Funcion para manejar el cambio de los checkbox, es decir, escucha los cambios en los checkbox y emite el evento con los filtros seleccionados
  // Se le pasa como parametro el evento y el campo que se esta cambiando
  onCheckboxChange(event: any, campo: string) {
    const formArray = this.formFiltros.get(campo) as FormArray;
    if (event.target.checked) {
      formArray.push(new FormControl(event.target.value));
    } else {
      const index = formArray.controls.findIndex(
        (ctrl) => ctrl.value === event.target.value
      );
      if (index >= 0) {
        formArray.removeAt(index);
      }
    }
  }

  //Funcion que emite el evento con los filtros seleccionados
  emitirFiltros(): void {
    const filtros = {
      ...this.formFiltros.value,
      ciudad: this.formFiltros.get('ciudad')?.value || null
    };
    this.filtrosChange.emit(filtros);
  }

  //Funcion para verificar si un checkbox esta seleccionado, se le pasa como parametro el campo y el valor
  // y devuelve true o false
  isChecked(campo: string, valor: string): boolean {
    const formArray = this.formFiltros.get(campo) as FormArray;
    return formArray.controls.some(ctrl => ctrl.value === valor);
  }

  // Método para alternar el estado del desplegable
  toggleFiltros(): void {
    this.abrirFltros = !this.abrirFltros;
  }
}
