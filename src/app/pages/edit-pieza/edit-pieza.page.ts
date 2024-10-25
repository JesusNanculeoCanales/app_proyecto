import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BasededatosService } from 'src/app/services/basededatos.service';  // Servicio para manejar SQLite

@Component({
  selector: 'app-edit-pieza',
  templateUrl: './edit-pieza.page.html',
  styleUrls: ['./edit-pieza.page.scss'],
})
export class EditPiezaPage implements OnInit {

  pieza: any = {
    id_pieza: null,
    nombre: '',
    descripcion: '',
    cantidad: 0,
    precio: 0  // Aquí se usa 'precio' en lugar de 'valor'
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private db: BasededatosService,  // Usamos BasededatosService para SQLite
    private router: Router
  ) { }

  ngOnInit() {
    const id_pieza = this.activatedRoute.snapshot.paramMap.get('id_pieza');  // Obtener el ID de la pieza de la ruta
    if (id_pieza) {
      this.cargarPieza(parseInt(id_pieza));  // Cargar los datos de la pieza
    }
  }

  // Cargar los datos de la pieza desde la base de datos
  cargarPieza(id_pieza: number) {
    this.db.buscarPiezaPorId(id_pieza).then((pieza) => {
      if (pieza) {
        this.pieza = pieza;  // Asignar los valores de la pieza al formulario
      }
    });
  }

  // Método para guardar los cambios en la pieza
  guardarCambios() {
    const usu_actual = localStorage.getItem('id_usu');  // Obtener el ID del usuario actual
    if (usu_actual) {
      const usuario_idusu = parseInt(usu_actual);  // Convertir a número

      this.db.actualizarPieza(
        this.pieza.id_pieza,
        this.pieza.nombre,
        this.pieza.descripcion,
        this.pieza.cantidad,
        this.pieza.precio,
        usuario_idusu
      ).then(() => {
        this.db.presentAlertExito('Pieza modificada exitosamente');
        this.router.navigate(['/list-piezas']);  // Redirigir a la lista de piezas
      }).catch((error) => {
        this.db.presentAlert('Error al modificar la pieza: ' + error.message);
      });
    } else {
      this.db.presentAlert('No se encontró un usuario logueado');
    }
  }
}
