import { Component } from '@angular/core';
import { Router } from '@angular/router';  
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-add-pieza',
  templateUrl: './add-pieza.page.html',
  styleUrls: ['./add-pieza.page.scss'],
})
export class AddPiezaPage {
  pieza = {
    id: '',
    nombre: '',
    descripcion: '',
    cantidad: 0,
    precio: 0,
    fecha_adquisicion: new Date(),
  };

  errores: { [key: string]: string } = {}; // Objeto para manejar mensajes de error

  constructor(
    private router: Router,
    private db: BasededatosService
  ) {}

  crearPieza() {
    // Limpiar errores
    this.errores = {};

    // Validaciones
    if (!this.pieza.nombre.trim() || this.pieza.nombre.trim().length < 3) {
      this.errores['nombre'] = 'El nombre debe tener al menos 3 caracteres.';
    }
    if (!this.pieza.descripcion.trim() || this.pieza.descripcion.trim().length < 3) {
      this.errores['descripcion'] = 'La descripción debe tener al menos 3 caracteres.';
    }
    if (!this.pieza.cantidad || this.pieza.cantidad < 1) {
      this.errores['cantidad'] = 'La cantidad debe ser al menos 1.';
    }
    if (!this.pieza.precio || this.pieza.precio < 1) {
      this.errores['precio'] = 'El precio debe ser al menos 1.';
    }

    // Si hay errores, detener ejecución
    if (Object.keys(this.errores).length > 0) {
      return;
    }

    // Obtener el usuario actual
    const usu_actual = localStorage.getItem('id_usu');
    if (usu_actual) {
      const usu_idusu = parseInt(usu_actual);

      // Agregar pieza
      this.db.anadirPieza(
        this.pieza.nombre,
        this.pieza.descripcion,
        this.pieza.cantidad,
        this.pieza.precio,
        this.pieza.fecha_adquisicion,
        usu_idusu
      ).then(() => {
        this.router.navigate(['/list-piezas']);
        this.db.presentAlertExito('Pieza agregada: ' + this.pieza.nombre);
      }).catch((err) => {
        this.db.presentAlert('Error al agregar la pieza: ' + err.message);
      });
    } else {
      this.db.presentAlert('Error al obtener el usuario actual.');
    }
  }
}
