import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Empleo from '../../models/Empleo';
import { AuthStateService } from '../../services/auth.service';
import { FavoritoService } from '../../services/favorito.service';
import { UsuarioService } from '../../services/usuario.service';
import { CommonModule } from '@angular/common';
import { CardEmpleoComponent } from '../card-empleo/card-empleo.component';

@Component({
  selector: 'app-perfil-usuario',
  imports: [CardEmpleoComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './perfil-usuario.component.html',
  styleUrl: './perfil-usuario.component.css'
})
export class PerfilUsuarioComponent {

  // Variables
  usuario: any;
  form: FormGroup;
  editMode = false;
  favoritos: Empleo[] = [];
  displayedFavoritos: Empleo[] = [];
  itemsPerPage = 3;
  currentPage = 0;
  hasMore = true;
  habilidadesArray: string[] = [];
  selectedFile: File | null = null;
  cvError: string | null = null;

  constructor(
    private authState: AuthStateService,
    private usuarioService: UsuarioService,
    private favoritoService: FavoritoService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      nombre: [
        this.usuario?.nombre || '', // Valor inicial que cumpla con las validaciones
        [Validators.required, Validators.minLength(3)]
      ],
      descripcion: [this.usuario?.descripcion || '', Validators.required],
      habilidades: [this.habilidadesArray.join(', ') || ''],
      cv: [null]
    });
  }

  ngOnInit(): void {
    this.cargarDatosUsuario();
    this.cargarFavoritos();
  }

  // Cargar datos del usuario desde el servicio de autenticación
  // y asignarlos al formulario
  cargarDatosUsuario() {
    this.usuarioService.obtenerUsuario().subscribe({
      next: (usuario) => {
        this.usuario = usuario;
        this.habilidadesArray = usuario.habilidades ? JSON.parse(usuario.habilidades) : [];
        
        // Inicializar el formulario con los datos del usuario
        this.form.patchValue({
          nombre: usuario.nombre || '',
          descripcion: usuario.descripcion || '',
          habilidades: this.habilidadesArray.join(', ') // Convertir array a string separado por comas
        });
      },
      error: (err) => console.error('Error al cargar datos del usuario', err)
    });
  }

  // Cargar los empleos favoritos del usuario
  cargarFavoritos() {
    this.favoritoService.getFavoritos().subscribe({
      next: (empleos: Empleo[]) => {
        this.favoritos = empleos;
        this.displayedFavoritos = []; // Limpiar antes de recargar
        this.currentPage = 0;
        this.loadMore();
      },
      error: (err) => console.error('Error al cargar favoritos', err)
    });
  }


  //Toggle para editar el perfil
  // Cambia el estado de edición y actualiza el formulario
  toggleEdit() {
    this.editMode = !this.editMode;
    console.log('EditMode:', this.editMode);
    if (!this.editMode) {
      this.form.patchValue({
        nombre: this.usuario.nombre || '',
        descripcion: this.usuario.descripcion || '',
        habilidades: this.habilidadesArray.join(', ')
      });
    }
  }


  // Guardar cambios en el perfil
  // Verifica si el formulario es válido y llama al servicio para actualizar
  guardarCambios() {
    if (this.form.valid) {
      const updatedData = this.form.value;
      
      // Convertir habilidades de string a array
      updatedData.habilidades = updatedData.habilidades 
        ? updatedData.habilidades.split(',').map((h: string) => h.trim()).filter((h: string) => h)
        : [];
      
      this.usuarioService.actualizarUsuario(this.usuario.id, updatedData).subscribe({
        next: (response) => {
          this.usuario = { 
            ...this.usuario, 
            nombre: updatedData.nombre,
            descripcion: updatedData.descripcion,
            habilidades: JSON.stringify(updatedData.habilidades)
          };
          this.habilidadesArray = updatedData.habilidades;
          this.editMode = false;
          this.authState.nombre = updatedData.nombre; // Actualizar el nombre en el estado de autenticación
        },
        error: (err) => console.error('Error al actualizar usuario', err)
      });
      if (this.selectedFile && !this.cvError) {
        this.usuarioService.actualizarCV(this.usuario.id, this.selectedFile).subscribe({
          next: () => {
            console.log('CV actualizado con éxito');
            this.selectedFile = null; // Limpiar el archivo seleccionado
          },
          error: (err) => console.error('Error al actualizar CV', err)
        });
      }
      alert('Cambios guardados con éxito');
    }
  }

  // Método para mostrar menos empleos
showLess() {
  // Reducir a la página anterior (si existe)
  if (this.currentPage > 1) {
    this.currentPage--;
  } else {
    // Si estamos en la primera página, mostrar solo los iniciales
    this.currentPage = 0;
  }
  
  // Recalcular los empleos a mostrar
  this.displayedFavoritos = this.favoritos.slice(0, this.currentPage * this.itemsPerPage);
  this.hasMore = true; // Siempre habrá más para mostrar después de reducir
}

// Metodo para cargar más empleos
// Carga más empleos favoritos y los agrega a la lista mostrada
loadMore() {
  const start = this.currentPage * this.itemsPerPage;
  const end = start + this.itemsPerPage;
  const newItems = this.favoritos.slice(start, end);
  
  this.displayedFavoritos = [...this.displayedFavoritos, ...newItems];
  this.currentPage++;
  
  this.hasMore = end < this.favoritos.length;
}

  //Actualizar el CV del usuario
  // Llama al servicio para actualizar el CV del usuario
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    this.cvError = null; // Resetear el error al seleccionar un nuevo archivo
    if (file) {
      
      // Validar que no esté vacío
      if (file.size === 0) {
        this.cvError = 'El archivo está vacío';
        this.selectedFile = null;
        return;
      }
      
      // Validar que sea PDF
      if (file.type !== 'application/pdf') {
        this.cvError = 'El archivo debe ser un PDF';
        this.selectedFile = null;
        return;
      }
      
      // Si pasa las validaciones
      this.cvError = null;
      this.selectedFile = file;
    }
  }

  eliminarDeFavoritos(empleoId: number) {
    console.log('Eliminando empleo de favoritos:', empleoId);
    // Filtrar los empleos para quitar el eliminado
    this.favoritos = this.favoritos.filter(empleo => empleo.id !== empleoId);
    this.displayedFavoritos = this.displayedFavoritos.filter(empleo => empleo.id !== empleoId);
    
    // Resetear la paginación
    this.currentPage = 0;
    this.loadMore();
  }

}
