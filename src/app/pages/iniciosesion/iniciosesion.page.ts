import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
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
  
        // Validación de la contraseña (al menos 4 números, 3 caracteres, 1 mayúscula)
        const passwordRegex = /^(?=.*\d{4,})(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;
        if (!password || (typeof password === 'string' && !passwordRegex.test(password))) {
          isValid = false;
          $('#passwordError').show();
        } else {
          $('#passwordError').hide();
        }
  
        // Si el formulario es válido, mostrar el loading y redirigir
        if (isValid) {
          const loading = await this.loadingCtrl.create({
            message: 'Iniciando sesión...',
            duration: 2000
          });
          await loading.present();
  
          loading.onDidDismiss().then(() => {
            // Guardar usuario en localStorage
            localStorage.setItem('user', JSON.stringify({ username }));
  
            // Redirigir a la página de inicio (home)
            const navigationExtras = {
              state: {
                username: username
              }
            };
            this.router.navigate(['/home'], navigationExtras);
          });
        }
      });
    });
  }
  

// Método para abrir el modal de recuperación de contraseña
  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ContrasenamodalComponent,  // Especifica el componente que actúa como modal
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      console.log('Correo ingresado:', data.email);
    }
  }
}

