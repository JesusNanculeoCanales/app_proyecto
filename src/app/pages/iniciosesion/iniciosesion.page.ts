import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ContrasenamodalComponent } from '../../componentes/contrasenamodal/contrasenamodal.component';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
    $(document).ready(() => {
      $('#submitBtn').on('click', async (event) => {
        event.preventDefault();

        const username = $('#username').val();
        const password = $('#password').val();
        let isValid = true;

        // Validación del nombre de usuario
        if (!username || (typeof username === 'string' && username.length < 3)) {
          isValid = false;
          $('#usernameError').show();
        } else {
          $('#usernameError').hide();
        }

        // Validación de la contraseña
        const passwordRegex = /^(?=.*\d{4,})(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;
        if (!password || (typeof password === 'string' && !passwordRegex.test(password))) {
          isValid = false;
          $('#passwordError').show();
        } else {
          $('#passwordError').hide();
        }

        if (isValid) {
          // Recuperar los usuarios registrados desde localStorage
          const users = JSON.parse(localStorage.getItem('users') || '[]');
          const user = users.find((u: any) => u.nombre === username && u.contrasena === password);

          if (user) {
            // Mostrar el loading y redirigir
            const loading = await this.loadingCtrl.create({
              message: 'Iniciando sesión...',
              duration: 2000
            });
            await loading.present();

            loading.onDidDismiss().then(() => {
              // Guardar al usuario como "usuario autenticado"
              localStorage.setItem('user', JSON.stringify(user));

              // Redirigir a la página de inicio (home)
              this.router.navigate(['/home']);
            });
          } else {
            // Si las credenciales son incorrectas
            alert('Nombre de usuario o contraseña incorrectos');
          }
        }
      });
    });
  }

  // Método para abrir el modal de recuperación de contraseña
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ContrasenamodalComponent,
    });
    await modal.present();
  }
}
