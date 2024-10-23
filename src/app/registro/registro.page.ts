import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { BasededatosService } from '../services/basededatos.service';  // Asegúrate de que la ruta es correcta
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  constructor(private basededatosService: BasededatosService, private router: Router) {}

  ngOnInit() {
    $(document).ready(() => {
      $('#submitBtn').on('click', async (event: Event) => {
        event.preventDefault();

        let isValid = true;

        const nombre = $('#nombre').val();
        const email = $('#email').val();
        const contrasena = $('#contrasena').val();

        // Validaciones
        if (!nombre || (typeof nombre === 'string' && nombre.length < 3)) {
          isValid = false;
          $('#nombreError').show();
        } else {
          $('#nombreError').hide();
        }

        const emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
        if (!email || (typeof email === 'string' && !emailPattern.test(email))) {
          isValid = false;
          $('#emailError').show();
        } else {
          $('#emailError').hide();
        }

        const regex = /^(?=.*[A-Z])(?=(.*\d){4})(?=(.*[a-zA-Z]){3}).{8,}$/;
        if (!contrasena || (typeof contrasena === 'string' && !regex.test(contrasena))) {
          isValid = false;
          $('#contrasenaError').show();
        } else {
          $('#contrasenaError').hide();
        }

        if (isValid) {
          const newUser = {
            nombre: nombre,
            correo: email,
            clave: contrasena,
            rol_idrol: 2  // Aquí puedes decidir qué rol asignar al nuevo usuario
          };

          // Insertar el nuevo usuario en la base de datos
          const resultado = await this.basededatosService.registrarUsuario(newUser);

          if (resultado) {
            alert('Usuario registrado exitosamente');
            this.router.navigate(['/login']);
          } else {
            alert('Error: El usuario ya está registrado o ocurrió un error.');
          }
        }
      });
    });
  }
}
