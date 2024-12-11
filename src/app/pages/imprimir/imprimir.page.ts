import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-imprimir',
  templateUrl: './imprimir.page.html',
  styleUrls: ['./imprimir.page.scss'],
})
export class ImprimirPage implements OnInit {
  factura: any = null;
  mostrandoAnimacion: boolean = false; // Declaración de la propiedad
  impresionExitosa: boolean = false; // Declaración de la propiedad

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    // Recibe los datos enviados desde factura
    this.route.queryParams.subscribe(params => {
      if (params && params['factura']) {
        this.factura = JSON.parse(params['factura']);
      }
    });
  }

  async imprimir() {
    // Mostrar el loading
    const loading = await this.loadingCtrl.create({
      message: 'Imprimiendo...',
      duration: 2000, // Simula 2 segundos de impresión
    });
    await loading.present();

    // Redirigir al home después de que se cierra el loading
    loading.onDidDismiss().then(() => {
      this.router.navigate(['/home']);
    });
  }
}
