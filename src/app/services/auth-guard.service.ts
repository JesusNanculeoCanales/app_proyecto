import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    // Verificamos si hay un usuario autenticado en el localStorage
    const user = localStorage.getItem('user');
    
    if (!user) {
      // Si no está autenticado, redirige a la página de login
      this.router.navigate(['/login']);
      return false;
    }

    // Si está autenticado, permite el acceso a la ruta
    return true;
  }
}
