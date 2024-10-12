import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiURL = 'http://localhost:3000';  // Aquí está la URL de tu JSON Server

  constructor(private http: HttpClient) {}

  // Método para crear una nueva pieza
  createPieza(pieza: any): Observable<any> {
    return this.http.post(`${this.apiURL}/piezas`, pieza);
  }

  // Método para obtener todas las piezas
  getPiezas(): Observable<any> {
    return this.http.get(`${this.apiURL}/piezas`);
  }

  // Método para eliminar una pieza
  deletePieza(id: number): Observable<any> {
    return this.http.delete(`${this.apiURL}/piezas/${id}`);
  }
}
