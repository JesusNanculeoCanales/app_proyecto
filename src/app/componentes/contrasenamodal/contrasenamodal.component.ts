import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ModalController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';  // Importa el Router para la navegación

@Component({
  selector: 'app-contrasenamodal',
  templateUrl: './contrasenamodal.component.html',
  styleUrls: ['./contrasenamodal.component.scss'],
})
export class ContrasenamodalComponent implements OnInit {

  constructor(private modalCtrl: ModalController, private toastCtrl: ToastController, private router: Router) {}  // Agrega Router en el constructor

  ngOnInit() {
    $(document).ready(() => {
      // Validación y envío del formulario
      $('#submitEmailBtn').on('click', async (event: Event) => {
        event.preventDefault();

        let isValid = true;

        // Validación del email
        const email = $('#email').val() as string;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email || !emailRegex.test(email)) {
          isValid = false;
          $('#emailError').show();  // Muestra mensaje de error
        } else {
          $('#emailError').hide();  // Oculta mensaje de error si es válido
        }

        if (isValid) {
          // Mostrar el toast de éxito
          const toast = await this.toastCtrl.create({
            message: '¡El correo fue enviado correctamente!',
            duration: 3000,  // Duración de 3 segundos
            color: 'success'
          });
          await toast.present();

          // Esperar a que el toast desaparezca antes de cerrar el modal
          toast.onDidDismiss().then(() => {
            this.confirmar(email);  // Ahora cerramos el modal
          });
        }
      });

      // Si el usuario hace clic en la flecha de retroceso
      $('ion-back-button').on('click', () => {
        this.router.navigate(['/iniciosesion']);  // Redirige manualmente a 'iniciosesion'
      });
    });
  }

  cancelar() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmar(email: string) {
    this.modalCtrl.dismiss({ email }, 'confirm');
  }
}
