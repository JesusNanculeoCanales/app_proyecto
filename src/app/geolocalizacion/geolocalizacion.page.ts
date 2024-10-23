import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

declare var google: any;

@Component({
  selector: 'app-geolocalizacion',
  templateUrl: './geolocalizacion.page.html',
  styleUrls: ['./geolocalizacion.page.scss'],
})
export class GeolocalizacionPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map: any;

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      // Solicitar la ubicación con alta precisión
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,  // Alta precisión
        timeout: 10000,            // Opcional: tiempo de espera en milisegundos
        maximumAge: 0              // Opcional: no reutilizar ubicaciones antiguas
      });

      const latLng = new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude);

      const mapOptions = {
        center: latLng,
        zoom: 18,  // Mayor zoom para ver más detalles en la ubicación
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    } catch (error) {
      console.error('Error obteniendo la ubicación: ', error);
    }
  }
}
