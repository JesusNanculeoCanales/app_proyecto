import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {
  datosVehiculo: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    // Recibe los datos enviados desde agendar
    this.route.queryParams.subscribe(params => {
      if (params && params['datos']) {
        this.datosVehiculo = JSON.parse(params['datos']);
      }
    });
  }

  async confirmar() {
    const loading = await this.loadingCtrl.create({
      message: 'Procesando...',
      duration: 2000, // Tiempo de espera
    });
    await loading.present();

    loading.onDidDismiss().then(() => {
      this.router.navigate(['/home']); // Redirige a la página home
    });
  }
}
