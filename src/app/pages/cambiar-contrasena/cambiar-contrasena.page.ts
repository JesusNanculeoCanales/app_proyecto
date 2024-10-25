import { Component, OnInit } from '@angular/core';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-cambiar-contrasena',
  templateUrl: './cambiar-contrasena.page.html',
  styleUrls: ['./cambiar-contrasena.page.scss'],
})
export class CambiarContrasenaPage implements OnInit {
  nuevaClave = '';
  confirmarClave = '';
  error = false;

  constructor(private db: BasededatosService, private navCtrl: NavController) {}

  ngOnInit() {}

  // Función cambiarClave que valida y cambia la contraseña
  async cambiarClave() {
    this.error = false;

    // Validar si las contraseñas coinciden y cumplen los requisitos
    if (this.nuevaClave !== this.confirmarClave || !this.validarClave(this.nuevaClave)) {
      this.error = true;
      this.db.presentAlert('Las contraseñas no coinciden o no cumplen con los requisitos.');
      return;
    }

    // Obtener el ID del usuario desde localStorage
    const idUsuario = localStorage.getItem('id_usu');
    console.log('ID de usuario recuperado:', idUsuario); // Verificación en consola

    // Validar si el usuario está logueado
    if (!idUsuario) {
      this.db.presentAlert('No se encontró un usuario logueado.');
      return;
    }

    try {
      // Cambiar la contraseña en la base de datos
      await this.db.actualizarClaveUsuario(parseInt(idUsuario), this.nuevaClave);
      this.db.presentAlertExito('Contraseña actualizada exitosamente');
      this.navCtrl.navigateRoot('/login'); // Redirigir al login
    } catch (e) {
      this.db.presentAlert('Error al actualizar la contraseña. Intenta nuevamente.');
    }
  }

  // Validar si la clave cumple los requisitos
  validarClave(clave: string): boolean {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    return passwordRegex.test(clave);
  }
}
