import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PagedResponse } from '../models/PagedResponse';
import Empleo from '../models/Empleo';

@Injectable({
  providedIn: 'root'
})
export class EmpleoService {
  private apiUrl = "http://localhost:8080/api/findee";

  constructor(private http: HttpClient) { }

 getEmpleosPaginados(page: number = 0, size: number = 10): Observable<PagedResponse<Empleo>> {
  const params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  return this.http.get<PagedResponse<Empleo>>(`${this.apiUrl}/empleos`, { params }).pipe(
    tap(response => {
      console.log('Respuesta del servidor:', response); // Debug
      console.log('Datos recibidos:', response.content); // Debug
    })
  );
}
}
