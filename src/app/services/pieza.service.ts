import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PiezaService {

  private apiUrl = 'http://localhost:3000/piezas';  // URL de la API local

  constructor(private http: HttpClient) {}

  // Obtener todas las piezas
  getPiezas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Crear una nueva pieza
  addPieza(pieza: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, pieza);
  }

  // Obtener una pieza por ID
  getPiezaById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Actualizar una pieza
  updatePieza(pieza: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${pieza.id}`, pieza);
  }

  // Eliminar una pieza
  deletePieza(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
