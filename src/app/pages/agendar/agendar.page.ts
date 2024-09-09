import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';  // Cambié el Router para usar el de Angular

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.page.html',
  styleUrls: ['./agendar.page.scss'],
})
export class AgendarPage implements OnInit {

  constructor(
    private loadingCtrl: LoadingController,  // Para manejar el modal de carga
    private router: Router                   // Para redirigir al finalizar
  ) {}

  ngOnInit() {
    $(document).ready(() => {
      $('#submitBtn').on('click', async (event: Event) => {  
        event.preventDefault();
        
        let isValid = true;

        // Validación del nombre
        const nombre = $('#nombre').val();
        if (!nombre || (typeof nombre === 'string' && nombre.length < 3)) {
          isValid = false;
          $('#nombreError').show();
        } else {
          $('#nombreError').hide();
        }

        // Validación del teléfono (solo números y longitud de 9 dígitos)
        const telefono = $('#telefono').val();
        if (!telefono || !/^[0-9]{9}$/.test(telefono.toString())) {
          isValid = false;
          $('#telefonoError').show();
        } else {
          $('#telefonoError').hide();
        }

        // Validación de la matrícula
        const matricula = $('#matricula').val();
        if (!matricula || !/^[A-Za-z0-9\-]{6,9}$/.test(matricula.toString())) {
          isValid = false;
          $('#matriculaError').show();
        } else {
          $('#matriculaError').hide();
        }

        // Validación de la marca del automóvil
        const marcaAuto = $('#marcaAuto').val();
        if (!marcaAuto) {
          isValid = false;
          $('#marcaAutoError').show();
        } else {
          $('#marcaAutoError').hide();
        }

        // Validación del email
        const email = $('#email').val();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email.toString())) {
          isValid = false;
          $('#emailError').show();
        } else {
          $('#emailError').hide();
        }

        // Validación de la fecha
        const fecha = $('#fecha').val();
        if (!fecha) {
          isValid = false;
          $('#fechaError').show();
        } else {
          $('#fechaError').hide();
        }

        // Si el formulario es válido, mostrar el loading y redirigir
        if (isValid) {
          const loading = await this.loadingCtrl.create({
            message: 'Agendando...',
            duration: 2000
          });
          await loading.present();

          loading.onDidDismiss().then(() => {
            // Redirigir a la página de inicio
            this.router.navigate(['/home']);
          });
        }
      });
    });
  }
}
