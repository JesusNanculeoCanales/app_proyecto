import { Component } from '@angular/core';
import { PiezaService } from '../../services/pieza.service';
import { Router } from '@angular/router';  // Importar Router para la redirección
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
    fecha_adquisicion: new Date
  };

  constructor(
    private piezaService: PiezaService,
    private router: Router,
    private db: BasededatosService
  ) {}

  // Método para crear una nueva pieza con ID como cadena
  crearPieza() {

    //OBTENER USUARIO ACTUAL
    const usu_actual = localStorage.getItem('id_usu');

    if(usu_actual){
      const usu_idusu = parseInt(usu_actual);
      //AÑADIR PIEZA
      this.db.anadirPieza(this.pieza.nombre,this.pieza.descripcion,this.pieza.cantidad,this.pieza.precio, this.pieza.fecha_adquisicion,usu_idusu).then(res =>{
        
        this.router.navigate(['/list-piezas']);
        this.db.presentAlertExito('Agregada pieza '+this.pieza.nombre);
      }
      )
    }else{
      this.db.presentAlert('Error al obtener el usuario actual :(');
    }

  }
}
