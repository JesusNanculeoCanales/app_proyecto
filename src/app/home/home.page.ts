import { Component, OnInit } from '@angular/core';
import { BasededatosService } from '../services/basededatos.service';  // Asegúrate de importar tu servicio correctamente

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = 'Invitado';  // Valor por defecto si no hay usuario

  constructor(private basededatosService: BasededatosService) {}

  ngOnInit() {
    this.obtenerUsuario();  // Llamamos al método para obtener el nombre del usuario cuando se inicie la página
  }

  obtenerUsuario() {
    // Llamamos al servicio para obtener el nombre del usuario logueado desde localStorage
    this.basededatosService.obtenerUsuarioLogueado().then(nombre => {
      if (nombre) {
        this.username = nombre;  // Asignamos el nombre obtenido al username
      } else {
        this.username = 'Invitado';  // Si no hay un usuario, mostramos "Invitado"
      }
    });
  }

  // Cerrar sesión y eliminar el nombre del usuario de localStorage
  logout() {
    localStorage.removeItem('nombreUsuario');  // Eliminamos el nombre del usuario del localStorage
    this.username = 'Invitado';  // Volvemos a mostrar "Invitado"
    // Aquí podrías agregar una redirección o cualquier otra acción necesaria al cerrar sesión
  }
}
