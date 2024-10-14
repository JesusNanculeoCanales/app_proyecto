import { Component } from '@angular/core';
import { PiezaService } from '../../services/pieza.service';
import { Router } from '@angular/router';  // Importar Router para la redirección

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
    valor: 0
  };

  constructor(
    private piezaService: PiezaService,
    private router: Router  // Inyectar el Router para redirigir
  ) {}

  // Método para crear una nueva pieza con ID como cadena
  crearPieza() {
    this.piezaService.getPiezas().subscribe(piezas => {
      const maxId = piezas.length > 0 ? Math.max(...piezas.map(p => parseInt(p.id))) : 0;  // Obtener el ID más alto como número
      this.pieza.id = String(maxId + 1);  // Asignar el siguiente ID disponible como cadena
      console.log('Creando pieza con ID: ', this.pieza.id);

      this.piezaService.addPieza(this.pieza).subscribe(() => {
        alert('Pieza creada exitosamente');
        this.router.navigate(['/list-piezas']);  // Redirigir a la lista de piezas después de crear la pieza
      });
    });
  }
}
