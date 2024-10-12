import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-piezas',
  templateUrl: './piezas.page.html',
  styleUrls: ['./piezas.page.scss'],
})
export class PiezasPage implements OnInit {
  piezas: any[] = [];
  pieza = {
    nombre: '',
    cantidad: 0,
    descripcion: '',
    valor: 0
  };

  constructor(
    private apiService: ApiService,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.loadPiezas();  // Cargar piezas existentes al iniciar la página
  }

  async loadPiezas() {
    const loading = await this.loadingCtrl.create({
      message: 'Cargando piezas...'
    });
    await loading.present();

    this.apiService.getPiezas().subscribe((response) => {
      this.piezas = response;  // Mostrar las piezas cargadas
      loading.dismiss();
    }, (error) => {
      console.log('Error al cargar piezas', error);
      loading.dismiss();
    });
  }

  // Método para agregar una nueva pieza
  async addPieza() {
    const loading = await this.loadingCtrl.create({
      message: 'Agregando pieza...'
    });
    await loading.present();

    this.apiService.createPieza(this.pieza).subscribe((response) => {
      this.piezas.push(response);  // Añadir la nueva pieza a la lista
      loading.dismiss();
      this.clearForm();  // Limpiar el formulario después de agregar
    }, (error) => {
      console.log('Error al agregar pieza', error);
      loading.dismiss();
    });
  }

  clearForm() {
    this.pieza = { nombre: '', cantidad: 0, descripcion: '', valor: 0 };
  }

  // Método para eliminar una pieza
  async deletePieza(id: number) {
    const loading = await this.loadingCtrl.create({
      message: 'Eliminando pieza...'
    });
    await loading.present();

    this.apiService.deletePieza(id).subscribe(() => {
      this.piezas = this.piezas.filter(p => p.id !== id);  // Eliminar la pieza de la lista
      loading.dismiss();
    }, (error) => {
      console.log('Error al eliminar pieza', error);
      loading.dismiss();
    });
  }
}
