import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.page.html',
  styleUrls: ['./vehiculos.page.scss'],
})
export class VehiculosPage implements OnInit {
  datosVehiculo: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Recibe los datos enviados desde agendar
    this.route.queryParams.subscribe(params => {
      if (params && params['datos']) {
        this.datosVehiculo = JSON.parse(params['datos']);
      }
    });
  }
}
