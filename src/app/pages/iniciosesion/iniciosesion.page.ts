import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ContrasenamodalComponent } from '../../componentes/contrasenamodal/contrasenamodal.component';  // Importa el componente del modal

@Component({
  selector: 'app-iniciosesion',
  templateUrl: './iniciosesion.page.html',
  styleUrls: ['./iniciosesion.page.scss'],
})
export class IniciosesionPage implements OnInit {
  loginForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,  // Controlador de carga para animación
    private router: Router  // Agregamos el Router para la redirección
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ContrasenamodalComponent,
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role === 'confirm') {
      console.log('Correo ingresado:', data.email);
      // Aquí puedes agregar la lógica para enviar el correo de recuperación
    }
  }

  async onSubmit() {
    if (this.loginForm.valid) {
      const username = this.loginForm.get('username')?.value;  // Obtén el nombre de usuario
      const loading = await this.loadingCtrl.create({
        message: 'Iniciando sesión...',
        duration: 2000  // Simula un tiempo de espera de 2 segundos
      });
      await loading.present();
  
      // Define NavigationExtras para pasar el nombre de usuario
      const navigationExtras = {
        state: {
          username: username
        }
      };
  
      // Después de la animación, redirige a home pasando el nombre de usuario
      loading.onDidDismiss().then(() => {
        this.router.navigate(['/home'], navigationExtras);  // Redirige a la página de inicio
      });
    } else {
      console.log('Formulario no válido');
    }
  }
}
