import { Component, OnInit } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ContrasenamodalComponent } from '../../componentes/contrasenamodal/contrasenamodal.component';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {

  username: string = '';
  password: string = '';

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private router: Router,
    private dbService: DatabaseService
  ) {}

  ngOnInit() {}

  async iniciarSesion() {
    let isValid = true;

    // Validación del nombre de usuario
    if (this.username.length < 3) {
      isValid = false;
      document.getElementById('usernameError')!.removeAttribute('hidden');
    } else {
      document.getElementById('usernameError')!.setAttribute('hidden', 'true');
    }

    // Validación de la contraseña
    const passwordRegex = /^(?=.*\d{4,})(?=.*[A-Z])(?=.*[a-zA-Z]).{7,}$/;
    if (!passwordRegex.test(this.password)) {
      isValid = false;
      document.getElementById('passwordError')!.removeAttribute('hidden');
    } else {
      document.getElementById('passwordError')!.setAttribute('hidden', 'true');
    }

    if (isValid) {
      const isValidUser = await this.dbService.validateUser(this.username, this.password);

      if (isValidUser) {
        const loading = await this.loadingCtrl.create({
          message: 'Iniciando sesión...',
          duration: 2000
        });
        await loading.present();

        loading.onDidDismiss().then(() => {
          this.router.navigate(['/home']);
        });
      } else {
        alert('Nombre de usuario o contraseña incorrectos');
      }
    }
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ContrasenamodalComponent,
    });
    await modal.present();
  }
}
