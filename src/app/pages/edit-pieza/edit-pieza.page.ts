import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasededatosService } from 'src/app/services/basededatos.service';  // Servicio para manejar SQLite

@Component({
  selector: 'app-edit-pieza',
  templateUrl: './edit-pieza.page.html',
  styleUrls: ['./edit-pieza.page.scss'],
})
export class EditPiezaPage implements OnInit {

  id_pieza!: number;
  nombre!: string;
  descripcion!: string;
  cantidad!: number;
  precio!: number;
  usuario_idusu!: number;

  errores: { [key: string]: string } = {}; // Objeto para manejar mensajes de error

  constructor(
    private db: BasededatosService,  // Usamos BasededatosService para SQLite
    private router: Router,
    private activedRouter: ActivatedRoute
  ) { 
    //VALORES PARA EDITAR
    this.activedRouter.queryParams.subscribe(param => {
      if (this.router.getCurrentNavigation()?.extras.state) {
        const state = this.router.getCurrentNavigation()?.extras?.state;

        this.id_pieza = state?.['id_pieza'] ?? this.id_pieza;
        this.nombre = state?.['nombre'] ?? this.nombre;
        this.descripcion = state?.['descripcion'] ?? this.descripcion;
        this.cantidad = state?.['cantidad'] ?? this.cantidad;
        this.precio = state?.['precio'] ?? this.precio;
        this.usuario_idusu = state?.['usuario_idusu'] ?? this.usuario_idusu;
      }
    });
  }

  ngOnInit() {}

  guardarCambios() {
    // Limpiar errores
    this.errores = {};

    // Validaciones
    if (!this.nombre.trim() || this.nombre.trim().length < 3) {
      this.errores['nombre'] = 'El nombre debe tener al menos 3 caracteres.';
    }
    if (!this.descripcion.trim() || this.descripcion.trim().length < 3) {
      this.errores['descripcion'] = 'La descripción debe tener al menos 3 caracteres.';
    }
    if (!this.cantidad || this.cantidad < 1) {
      this.errores['cantidad'] = 'La cantidad debe ser al menos 1.';
    }
    if (!this.precio || this.precio < 1) {
      this.errores['precio'] = 'El precio debe ser al menos 1.';
    }

    // Si hay errores, detener ejecución
    if (Object.keys(this.errores).length > 0) {
      return;
    }

    // Obtener el usuario actual
    const usu_actual = localStorage.getItem('id_usu'); 
    if (usu_actual) {
      this.db.actualizarPieza(
        this.id_pieza,
        this.nombre,
        this.descripcion,
        this.cantidad,
        this.precio,
        this.usuario_idusu
      ).then(() => {
        this.db.presentAlertExito('Pieza modificada exitosamente');
        this.router.navigate(['/list-piezas']); 
      }).catch((error) => {
        console.error('Error al actualizar la pieza:', error);
        this.db.presentAlert('Error al modificar la pieza: ' + error.message);
      });
    } else {
      this.db.presentAlert('No se encontró un usuario logueado');
    }
  }
}
