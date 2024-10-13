import { Component, OnInit } from '@angular/core';
import { PiezaService } from '../../services/pieza.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-piezas',
  templateUrl: './list-piezas.page.html',
  styleUrls: ['./list-piezas.page.scss'],
})
export class ListPiezasPage implements OnInit {

  piezas: any[] = [];

  constructor(private piezaService: PiezaService, private router: Router) {}

  ngOnInit() {
    this.piezaService.getPiezas().subscribe(data => {
      this.piezas = data;  // Obtener las piezas de la API
    });
  }

  // Método para eliminar una pieza
  eliminarPieza(id: number) {
    this.piezaService.deletePieza(id).subscribe(() => {
      // Después de eliminar, actualizamos la lista filtrando la pieza eliminada
      this.piezas = this.piezas.filter(p => p.id !== id);
      alert('Pieza eliminada exitosamente');
    });
  }

  // Método para navegar a la página de edición de piezas
  editarPieza(id: number) {
    this.router.navigate(['/edit-pieza', id]);  // Redirige a la página de edición con el ID de la pieza
  }
}

