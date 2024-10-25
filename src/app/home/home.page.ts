import { Component, OnInit } from '@angular/core';
import { BasededatosService } from '../services/basededatos.service';  // Asegúrate de importar tu servicio correctamente
import { NavController } from '@ionic/angular'; // Importar NavController para manejar la navegación

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = 'Invitado';  // Valor por defecto si no hay usuario

  constructor(private basededatosService: BasededatosService, private navCtrl: NavController) {}

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
    // Limpiar todos los datos del usuario del localStorage
    localStorage.removeItem('nombreUsuario');  // Eliminar el nombre del usuario
    localStorage.removeItem('id_usu');  // Eliminar el id del usuario para asegurarse de que la sesión termine

    // Volver a mostrar "Invitado"
    this.username = 'Invitado';

    // Redirigir a la página de login
    this.navCtrl.navigateRoot('/login');
  }
}
