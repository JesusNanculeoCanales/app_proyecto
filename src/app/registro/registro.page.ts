import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../services/database.service';  
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  nombre: string = '';
  email: string = '';
  contrasena: string = '';

  constructor(
    private dbService: DatabaseService,
    private router: Router,
    private alertCtrl: AlertController
  ) {}

  ngOnInit() {}

  async register() {
    let isValid = true;

    // Validaciones
    if (this.nombre.length < 3) {
      isValid = false;
      document.getElementById('nombreError')!.removeAttribute('hidden');
    } else {
      document.getElementById('nombreError')!.setAttribute('hidden', 'true');
    }

    const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    if (!emailPattern.test(this.email)) {
      isValid = false;
      document.getElementById('emailError')!.removeAttribute('hidden');
    } else {
      document.getElementById('emailError')!.setAttribute('hidden', 'true');
    }

    const regex = /^(?=.*[A-Z])(?=(.*\d){4})(?=(.*[a-zA-Z]){3}).{8,}$/;
    if (!regex.test(this.contrasena)) {
      isValid = false;
      document.getElementById('contrasenaError')!.removeAttribute('hidden');
    } else {
      document.getElementById('contrasenaError')!.setAttribute('hidden', 'true');
    }

    if (isValid) {
      this.dbService.addUser(this.nombre, this.contrasena)
        .then(async () => {
          const alert = await this.alertCtrl.create({
            header: 'Éxito',
            message: 'Usuario registrado correctamente.',
            buttons: ['OK']
          });
          await alert.present();
          this.router.navigate(['/login']);
        })
        .catch(async (error) => {
          const alert = await this.alertCtrl.create({
            header: 'Error',
            message: 'El nombre de usuario ya existe.',
            buttons: ['OK']
          });
          await alert.present();
        });
    }
  }
}


