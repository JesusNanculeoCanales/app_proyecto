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
  errores: { [key: string]: string } = {};

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
    this.dbService.fetchPiezas().subscribe((piezas) => {
      this.piezas = piezas.map((pieza) => ({
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
    const totalPiezas = this.piezas.reduce((acc, pieza) => acc + pieza.precio * pieza.seleccionada, 0);
    const totalServicio = this.servicioSeleccionado ? this.servicioSeleccionado.precio : 0;
    this.total = totalPiezas + totalServicio;
    this.cdr.detectChanges();
  }

  validarFormulario(): boolean {
    const nombre = (document.getElementById('nombre') as HTMLInputElement).value.trim();
    const telefono = (document.getElementById('telefono') as HTMLInputElement).value.trim();
    const matricula = (document.getElementById('matricula') as HTMLInputElement).value.trim();
    const marcaAuto = (document.getElementById('marcaAuto') as HTMLInputElement).value.trim();
    const email = (document.getElementById('email') as HTMLInputElement).value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    this.errores = {};

    if (!nombre || nombre.length < 3) {
      this.errores['nombre'] = 'El nombre debe tener al menos 3 caracteres.';
    }

    if (!telefono || !/^\d{9}$/.test(telefono)) {
      this.errores['telefono'] = 'El teléfono debe tener 9 dígitos numéricos.';
    }

    if (!matricula || matricula.length < 6) {
      this.errores['matricula'] = 'La matrícula debe tener al menos 6 caracteres.';
    }

    if (!marcaAuto) {
      this.errores['marcaAuto'] = 'Por favor, ingresa la marca del automóvil.';
    }

    if (!email || !emailRegex.test(email)) {
      this.errores['email'] = 'Por favor, ingresa un correo válido.';
    }

    if (!this.servicioSeleccionado) {
      this.errores['servicio'] = 'Debes seleccionar un servicio.';
    }

    return Object.keys(this.errores).length === 0;
  }

  async procesarFactura() {
    if (!this.validarFormulario()) {
      console.error('Errores en el formulario:', this.errores);
      return;
    }

    const datosFactura = {
      nombre: (document.getElementById('nombre') as HTMLInputElement).value.trim(),
      telefono: (document.getElementById('telefono') as HTMLInputElement).value.trim(),
      matricula: (document.getElementById('matricula') as HTMLInputElement).value.trim(),
      marcaAuto: (document.getElementById('marcaAuto') as HTMLInputElement).value.trim(),
      email: (document.getElementById('email') as HTMLInputElement).value.trim(),
      servicio: this.servicioSeleccionado,
      piezas: this.piezas.filter((pieza) => pieza.seleccionada > 0),
      total: this.total,
    };

    const loading = await this.loadingCtrl.create({
      message: 'Procesando factura...',
      duration: 2000,
    });
    await loading.present();

    loading.onDidDismiss().then(() => {
      this.router.navigate(['/imprimir'], {
        queryParams: { factura: JSON.stringify(datosFactura) },
      });
    });
  }
}
