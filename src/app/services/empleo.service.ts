import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PagedResponse } from '../models/PagedResponse';
import Empleo from '../models/Empleo';

@Injectable({
  providedIn: 'root'
})
export class EmpleoService {
  private apiUrl = "https://findeebackend.onrender.com/api/findee";

  constructor(private http: HttpClient) { }


  //Funcion que llama a la api para traerse los empleos de forma paginada
  // Se le pasan como parametros la pagina y el tamaño de la pagina
  getEmpleosPaginados(page: number = 0, size: number = 10, filtros?: any): Observable<PagedResponse<Empleo>> {
  console.log('Solicitando empleos con:', {page, size, filtros}); // Debug
  
  let params = new HttpParams()
    .set('page', page.toString())
    .set('size', size.toString());

  if (filtros) {
    Object.keys(filtros).forEach(key => {
      if (filtros[key] && filtros[key].toString().length > 0) {
        params = params.set(key, filtros[key].toString());
        console.log(`Añadiendo filtro ${key}:`, filtros[key]); // Debug
      }
    });
  }

  console.log('Params finales:', params.toString()); // Debug
  return this.http.get<PagedResponse<Empleo>>(`${this.apiUrl}/empleos`, { params });
}

  obtenerOpcionesFiltro(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/empleos/filtro`);
  }
}
