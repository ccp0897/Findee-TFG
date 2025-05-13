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
  

  constructor(private formBuilder: FormBuilder, private router: Router, public authState: AuthStateService) {
    this.registroForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required],
      descripcion: ['', Validators.required],
      nuevaHabilidad: ['']
    });
  }

  //Agregar una nueva habilidad al array de habilidades
  agregarHabilidad() {
    const nueva = this.registroForm.get('nuevaHabilidad')?.value.trim();
    if (nueva) {
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

  onSubmit() {
    if (this.registroForm.valid) {
      // Aquí enviarías la data al backend
      console.log('Formulario:', this.registroForm.value);
      console.log('Habilidades:', this.habilidades);
      console.log('CV:', this.cvFile);

      // Simular login exitoso
      // authService.loginSimulado();
      this.authState.isLoggedIn = true;
      this.router.navigate(['/']);

    }else{
      console.log('Formulario inválido');
      // Aquí podrías mostrar un mensaje de error al usuario
      
    }
  }

}
