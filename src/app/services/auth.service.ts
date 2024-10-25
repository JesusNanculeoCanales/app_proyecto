import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('id_usu');
    localStorage.removeItem('nombreUsuario');
  }

  // Método para verificar si un usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('id_usu');
  }
}
