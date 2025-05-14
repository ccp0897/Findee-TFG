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

  registroForm: FormGroup;
  habilidades: string[] = [];
  cvFile: File | null = null;
  

  constructor(private formBuilder: FormBuilder, private router: Router, private authState: AuthStateService) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required],
      descripcion: ['', Validators.required],
      nuevaHabilidad: ['']
    });
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
      this.cvFile = input.files[0];
    }
  }

  //Cuando se envia el folumlario, lo primero es comprobar si el formulario es válido
  onSubmit() {
    if (this.registroForm.valid && this.cvFile) {
      //Validar que las contraseñas sean iguales
      if (this.registroForm.value.contrasena !== this.registroForm.value.confirmarPassword) {
        alert('Las contraseñas no coinciden');
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

    }else if (this.registroForm.invalid) { //Si el formulario es invalido
      //Comprobar si el formulario es inválido
      Object.entries(this.registroForm.controls).forEach(([key, control]) => {
        if (control.invalid) {
            if (control.errors?.['required']) {
            alert(`→ "${key}" es requerido.`); //Comprobar si el campo es requerido
          }

          if (control.errors?.['minlength']) { //comprobar si el campo tiene un minimo de caracteres
            alert(`→ "${key}" debe tener al menos ${control.errors['minlength'].requiredLength} caracteres.`);
          }

          if (control.errors?.['email']) { //comprobar si el campo es un email valido
            alert(`→ "${key}" no es un correo electrónico válido.`);
          }
        }
      });
      return;
    }
  }

}
