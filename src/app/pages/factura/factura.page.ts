import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.page.html',
  styleUrls: ['./factura.page.scss'],
})
export class FacturaPage implements OnInit {
  piezas: any[] = [];
  total: number = 0;
  servicios = [
    { nombre: 'Mantención', precio: 80000 },
    { nombre: 'Cambio de Aceite', precio: 19990 },
    { nombre: 'Servicio Completo', precio: 120000 }
  ];
  servicioSeleccionado: any = null;

  constructor(
    private dbService: BasededatosService,
    private loadingCtrl: LoadingController,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.cargarPiezas();
  }

  cargarPiezas() {
    this.dbService.fetchPiezas().subscribe(piezas => {
      this.piezas = piezas.map(pieza => ({
        ...pieza,
        cantidad: Number(pieza.cantidad),
        precio: Number(pieza.precio),
        seleccionada: 0
      }));
      this.actualizarTotal(); 
    });
  }

  seleccionarServicio(servicio: any) {
    this.servicioSeleccionado = servicio;
    this.actualizarTotal();
  }

  agregarPieza(pieza: any) {
    if (pieza.seleccionada < pieza.cantidad) {
      pieza.seleccionada++;
      this.actualizarTotal();
    }
  }

  restarPieza(pieza: any) {
    if (pieza.seleccionada > 0) {
      pieza.seleccionada--;
      this.actualizarTotal();
    }
  }

  actualizarTotal() {
    const totalPiezas = this.piezas.reduce((acc, pieza) => acc + (pieza.precio * pieza.seleccionada), 0);
    const totalServicio = this.servicioSeleccionado ? this.servicioSeleccionado.precio : 0;
    this.total = totalPiezas + totalServicio;
    this.cdr.detectChanges(); 
  }

  procesarFactura() {
    const datosFactura = {
      nombre: (document.getElementById('nombre') as HTMLInputElement).value,
      telefono: (document.getElementById('telefono') as HTMLInputElement).value,
      matricula: (document.getElementById('matricula') as HTMLInputElement).value,
      marcaAuto: (document.getElementById('marcaAuto') as HTMLInputElement).value,
      email: (document.getElementById('email') as HTMLInputElement).value,
      servicio: this.servicioSeleccionado,
      piezas: this.piezas.filter(pieza => pieza.seleccionada > 0),
      total: this.total,
    };

    this.router.navigate(['/imprimir'], {
      queryParams: { factura: JSON.stringify(datosFactura) },
    });
  }
}
