import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor() {}

  ngOnInit() {
    $(document).ready(() => {
      $('#submitBtn').on('click', (event: Event) => {  
        event.preventDefault();
        
        let isValid = true;

        // Validación del nombre
        const nombre = $('#nombre').val();
        if (!nombre || (typeof nombre === 'string' && nombre.length < 3)) {
          isValid = false;
          $('#nombreError').show();  // Mostrar el error
        } else {
          $('#nombreError').hide();  // Esconder el error si es válido
        }

        // Validación del email
        const email = $('#email').val();
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!email || (typeof email === 'string' && !emailPattern.test(email))) {
          isValid = false;
          $('#emailError').show();  // Mostrar el error
        } else {
          $('#emailError').hide();  // Esconder el error si es válido
        }

        // Validación de la contraseña con el patrón solicitado
        const contrasena = $('#contrasena').val();
        const regex = /^(?=.*[A-Z])(?=(.*\d){4})(?=(.*[a-zA-Z]){3}).{8,}$/;
        
        if (!contrasena || (typeof contrasena === 'string' && !regex.test(contrasena))) {
          isValid = false;
          $('#contrasenaError').show();  // Mostrar el error
        } else {
          $('#contrasenaError').hide();  // Esconder el error si es válida
        }

        if (isValid) {
          // Procesar el formulario si todo es válido
          alert('Formulario válido');
        }
      });
    });
  }
}
