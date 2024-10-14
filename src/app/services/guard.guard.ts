import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';  // Importamos el AuthService

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      return true;  // Si el usuario está autenticado, puede acceder
    } else {
      this.router.navigate(['/login']);  // Si no está autenticado, redirige a login
      return false;
    }
  }
}