import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';  // Importamos jQuery para manejar eventos del DOM

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor() {}

  ngOnInit() {
    // $(document).ready() asegura que el DOM esté completamente cargado antes de ejecutar el código jQuery.
    $(document).ready(() => {

      // Aquí manejamos el evento 'click' del botón de envío del formulario
      $('#submitBtn').on('click', (event: Event) => {  
        event.preventDefault();  // Previene que el formulario se envíe de forma predeterminada, permitiendo validaciones personalizadas
        
        let isValid = true;  // Variable para comprobar si todas las validaciones pasan

        // =====================
        // Validación del nombre
        // =====================
        const nombre = $('#nombre').val();  // Obtiene el valor del campo 'nombre'
        if (!nombre || (typeof nombre === 'string' && nombre.length < 3)) {  // Verifica si el nombre tiene al menos 3 caracteres
          isValid = false;  // Si no es válido, cambia `isValid` a false
          $('#nombreError').show();  // Muestra el mensaje de error en el DOM
        } else {
          $('#nombreError').hide();  // Esconde el mensaje de error si el valor es válido
        }

        // =====================
        // Validación del email
        // =====================
        const email = $('#email').val();  // Obtiene el valor del campo 'email'
        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;  // Patrón para validar direcciones de correo electrónico
        if (!email || (typeof email === 'string' && !emailPattern.test(email))) {  // Valida que el email siga el formato correcto
          isValid = false;  // Si no es válido, cambia `isValid` a false
          $('#emailError').show();  // Muestra el mensaje de error
        } else {
          $('#emailError').hide();  // Esconde el mensaje de error si el email es válido
        }

        // ====================================
        // Validación de la contraseña
        // Patrón: 4 números, 1 mayúscula, 3 letras
        // ====================================
        const contrasena = $('#contrasena').val();  // Obtiene el valor del campo 'contrasena'
        const regex = /^(?=.*[A-Z])(?=(.*\d){4})(?=(.*[a-zA-Z]){3}).{8,}$/;  // validar la contraseña
        
        if (!contrasena || (typeof contrasena === 'string' && !regex.test(contrasena))) {  // Verifica que la contraseña sea válida
          isValid = false;  // Si no es válida, cambia `isValid` a false
          $('#contrasenaError').show();  // Muestra el mensaje de error
        } else {
          $('#contrasenaError').hide();  // Esconde el mensaje de error si la contraseña es válida
        }

        // =====================
        // Si todas las validaciones son correctas
        // =====================
        if (isValid) {
          alert('Formulario válido');  // Muestra un mensaje o ejecuta alguna acción cuando todo es válido
          // Aquí puedes agregar el código para enviar el formulario
        }
      });
    });
  }
}
