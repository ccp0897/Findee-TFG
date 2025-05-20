import { Component, OnInit } from '@angular/core';
import { EmpleoRecomendado } from '../../models/EmpleoRecomendado';
import { RecomendacionService } from '../../services/recomendacion.service';
import { CommonModule } from '@angular/common';
import { AuthStateService } from '../../services/auth.service';

@Component({
  selector: 'app-recomendacion',
  imports: [CommonModule],
  templateUrl: './recomendacion.component.html',
  styleUrl: './recomendacion.component.css'
})
export class RecomendacionComponent implements OnInit{

  recomendaciones: EmpleoRecomendado[] = [];
  loading: boolean = true;

  constructor(private recomendacionService: RecomendacionService, private authState: AuthStateService){}

  ngOnInit(): void {
    console.log('Token:', this.authState.getToken()); // Verifica que existe
    this.recomendacionService.getRecomendaciones().subscribe({
      next: (data) => {
        this.recomendaciones = data;
        console.log('Recomendaciones:', this.recomendaciones);
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching recomendaciones', error);
        this.loading = false;
      }
    });
  }

}
