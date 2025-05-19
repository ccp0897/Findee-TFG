import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthStateService } from '../../services/auth.service';

@Component({
  selector: 'app-registro-form',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro-form.component.html',
  styleUrl: './registro-form.component.css'
})
export class RegistroFormComponent {

  //Definimos el formulario
  registroForm: FormGroup;
  habilidades: string[] = [];
  cvFile: File | null = null;
  cvError: string | null = null;
  //Propiedades para controlar estados del formulario
  formCompletado = false;
  contrasenasDiferentes = false;
  showPassword = false;

  constructor(private formBuilder: FormBuilder, private router: Router, private authState: AuthStateService) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required],
      descripcion: ['', Validators.required],
      nuevaHabilidad: this.formBuilder.control('', {
                        updateOn: 'change', // o 'blur'
                        validators: [] // si quieres añadir validadores aquí también
                      }) // Campo para añadir habilidades
     
    }, { updateOn: 'submit' });
  }

  //Agregar una nueva habilidad al array de habilidades
  agregarHabilidad() {
    const nueva = this.registroForm.get('nuevaHabilidad')?.value.trim();
    if (nueva && !this.habilidades.includes(nueva)) {
      this.habilidades.push(nueva);
      this.registroForm.get('nuevaHabilidad')?.setValue('');
    }
  }

  //Eliminar una habilidad del array de habilidades
  eliminarHabilidad(habilidad: string){
    this.habilidades = this.habilidades.filter(h => h !== habilidad);
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
      const file = input.files[0];
      
      // Validar que no esté vacío
      if (file.size === 0) {
        this.cvError = 'El archivo está vacío';
        this.cvFile = null;
        return;
      }
      
      // Validar que sea PDF
      if (file.type !== 'application/pdf') {
        this.cvError = 'El archivo debe ser un PDF';
        this.cvFile = null;
        return;
      }
      
      // Si pasa las validaciones
      this.cvError = null;
      this.cvFile = file;
    } else {
      this.cvError = 'Por favor, selecciona un archivo';
      this.cvFile = null;
    }
  }

  //Cuando se envia el folumlario, lo primero es comprobar si el formulario es válido
 
  onSubmit() {
    this.formCompletado = true;
    if (this.registroForm.valid && this.cvFile && !this.cvError) {
      //Validar que las contraseñas sean iguales
      if (this.registroForm.value.contrasena !== this.registroForm.value.confirmarPassword) {
        this.contrasenasDiferentes = true;
        return;
      }

      //Crear el objeto usuario
      const usuario = {
        nombre: this.registroForm.value.nombre,
        email: this.registroForm.value.email,
        contrasena: this.registroForm.value.contrasena,
        descripcion: this.registroForm.value.descripcion,
        habilidades: JSON.stringify(this.habilidades)
      };
      console.log(usuario);

      //Llamar al servicio de registrar usuario
      this.authState.registarUsuario(usuario, this.cvFile).subscribe(
        {
          next:() => {
            this.router.navigate(['/login']);
          },

          error:(error) => {
            console.error('Detalles del error:', error);
            if (error.status === 403) {
              alert('Acceso denegado: Verifica CORS/CSRF en el backend');
            } else {
              alert('Error en el registro: ' + error.error);
            }
              }
            }
      )
    }else if (!this.cvFile) { //Si el archivo no es valido
      this.cvError = "Por favor, sube tu CV en formato PDF";
      return;
    }
  }

}
