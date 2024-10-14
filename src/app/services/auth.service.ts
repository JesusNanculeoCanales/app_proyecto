import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() {}

  // Método para registrar un usuario
  registrarUsuario(user: any): boolean {
    // Simulamos el guardado de usuario en localStorage
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));
    return true;  // En un sistema real, aquí retornarías una promesa o un observable de la API
  }

  // Método para iniciar sesión
  login(username: string, password: string): boolean {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find((u: any) => u.email === username && u.contrasena === password);
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      return true;
    }
    return false;
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('user');
  }

  // Método para verificar si un usuario está autenticado
  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }
}
