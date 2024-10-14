import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PiezaService } from '../../services/pieza.service';

@Component({
  selector: 'app-edit-pieza',
  templateUrl: './edit-pieza.page.html',
  styleUrls: ['./edit-pieza.page.scss'],
})
export class EditPiezaPage implements OnInit {

  pieza: any = {
    id: null,
    nombre: '',
    descripcion: '',
    cantidad: 0,
    valor: 0
  };

  constructor(
    private activatedRoute: ActivatedRoute,
    private piezaService: PiezaService,
    private router: Router
  ) { }

  ngOnInit() {
    const id = this.activatedRoute.snapshot.paramMap.get('id');  // Obtener el ID de la pieza
    if (id) {
      this.piezaService.getPiezaById(+id).subscribe(data => {
        this.pieza = data;  // Cargar los datos de la pieza
      });
    }
  }

  // Método para guardar los cambios en la pieza
  guardarCambios() {
    this.piezaService.updatePieza(this.pieza).subscribe(() => {
      alert('Pieza modificada exitosamente');
      this.router.navigate(['/list-piezas']);  // Redirige de vuelta a la lista
    });
  }
}
