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
  precio!:number;
  usuario_idusu!: number;

  constructor(
    private db: BasededatosService,  // Usamos BasededatosService para SQLite
    private router: Router,
    private activedRouter: ActivatedRoute
  ) { 

    //VALORES PARA EDITAR VIAJE
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
    })

  }

  ngOnInit() {}

  guardarCambios() {
  
    const usu_actual = localStorage.getItem('id_usu');  // Obtener el ID del usuario actual
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
        this.router.navigate(['/list-piezas']);  // Redirigir a la lista de piezas
      }).catch((error) => {
        console.error('Error al actualizar la pieza:', error);
        this.db.presentAlert('Error al modificar la pieza: ' + error.message);
      });
    } else {
      this.db.presentAlert('No se encontró un usuario logueado');
    }
  }
  


}
