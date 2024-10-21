import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';  // Asegúrate de que la ruta es correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre = '';
  correo = '';
  password = '';

  constructor(private databaseService: DatabaseService, private router: Router) {}

  async ngOnInit() {
    await this.databaseService.initDB();  // Inicializar la base de datos cuando se carga la página
  }

  async registrarUsuario() {
    try {
      // Llamar al servicio para registrar un usuario
      await this.databaseService.registerUser(this.nombre, this.correo, this.password);
      alert('Usuario registrado exitosamente.');
      this.router.navigate(['/login']);  // Redirigir a la página de login
    } catch (error) {
      alert('El usuario ya está registrado o ocurrió un error.');
    }
  }
}
