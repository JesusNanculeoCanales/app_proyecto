import { Component } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { DatabaseService } from '../../services/database.service';  // Servicio de SQLite
import { ContrasenamodalComponent } from '../../componentes/contrasenamodal/contrasenamodal.component';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage {

  username: string = '';
  password: string = '';
  
  usernameError: boolean = false;
  passwordError: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private databaseService: DatabaseService  // Inyectamos el servicio de SQLite
  ) {}

  // Método para iniciar sesión
  async iniciarSesion() {
    let isValid = true;

    // Validación del nombre de usuario
    if (!this.username || this.username.length < 3) {
      this.usernameError = true;
      isValid = false;
    } else {
      this.usernameError = false;
    }

    // Validación de la contraseña
    const passwordRegex = /^(?=.*\d{4,})(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;
    if (!this.password || !passwordRegex.test(this.password)) {
      this.passwordError = true;
      isValid = false;
    } else {
      this.passwordError = false;
    }

    if (isValid) {
      // Mostrar el loading
      const loading = await this.loadingCtrl.create({
        message: 'Iniciando sesión...',
        duration: 2000
      });
      await loading.present();

      try {
        // Verificar las credenciales en la base de datos SQLite
        const user = await this.databaseService.loginUser(this.username, this.password);

        if (user) {
          // Guardar el usuario autenticado (en localStorage o donde lo prefieras)
          localStorage.setItem('user', JSON.stringify(user));

          // Redirigir a la página de inicio
          this.router.navigate(['/home']);
        } else {
          alert('Nombre de usuario o contraseña incorrectos');
        }
      } catch (error) {
        // Comprobamos si el error es de tipo Error antes de acceder a la propiedad message
        if (error instanceof Error) {
          alert('Error al iniciar sesión: ' + error.message);
        } else {
          alert('Ocurrió un error desconocido al iniciar sesión');
        }
        console.error('Error al iniciar sesión:', error);
      }

      // Ocultar el loading después de 2 segundos
      await loading.dismiss();
    }
  }

  // Método para abrir el modal de recuperación de contraseña
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ContrasenamodalComponent,
    });
    await modal.present();
  }
}
