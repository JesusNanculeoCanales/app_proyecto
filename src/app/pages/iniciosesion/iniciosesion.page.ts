import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController, NavController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {
  nombre_usuario = '';
  clave = '';

  showUsernameError = false;
  showPasswordError = false;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private db: BasededatosService,
    private navCtrl: NavController
  ) {}

  ngOnInit() {}

  async iniciar_sesion() {
    // Reiniciar los errores de validación
    this.showUsernameError = false;
    this.showPasswordError = false;

    let isValid = true;

    // Validación del nombre de usuario
    if (!this.nombre_usuario || this.nombre_usuario.length < 3) {
      this.showUsernameError = true;
      isValid = false;
    }

    // Validación de la contraseña
    const passwordRegex = /^(?=.*\d{4,})(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;
    if (!this.clave || !passwordRegex.test(this.clave)) {
      this.showPasswordError = true;
      isValid = false;
    }

    if (isValid) {
      try {
        // Mostrar el loading
        const loading = await this.loadingCtrl.create({
          message: 'Iniciando sesión...',
          duration: 2000
        });
        await loading.present();

        // Intentar iniciar sesión
        const usuario = await this.db.buscarUsuariosUnicoLogin(this.nombre_usuario, this.clave);

        loading.onDidDismiss().then(() => {
          if (usuario) {
            this.db.presentAlert('Sesión Iniciada');
            this.navCtrl.navigateRoot('/home');
          } else {
            this.db.presentAlert('Usuario o Contraseña incorrectos');
          }
        });
      } catch (error) {
        this.db.presentAlert('Ocurrió un error al iniciar sesión');
      }
    }
  }

  // Navegar a la página de recuperación de contraseña
  recuperarContrasena() {
    this.navCtrl.navigateForward('/recuperarcontrasena');
  }

}
