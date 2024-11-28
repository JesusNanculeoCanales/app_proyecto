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
  marker: any;

  constructor() {}

  ngOnInit() {
    this.loadMap();
  }

  async loadMap() {
    try {
      // Obtener la ubicación actual
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      });

      // Configurar la posición inicial
      const latLng = new google.maps.LatLng(coordinates.coords.latitude, coordinates.coords.longitude);

      const mapOptions = {
        center: latLng,
        zoom: 18,
        mapTypeId: google.maps.MapTypeId.ROADMAP,
      };

      // Inicializar el mapa
      this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

      // Agregar un marcador en la ubicación actual
      this.marker = new google.maps.Marker({
        position: latLng,
        map: this.map,
        title: 'Mi Ubicación',
        animation: google.maps.Animation.DROP,
      });
    } catch (error) {
      console.error('Error obteniendo la ubicación: ', error);
    }
  }
}
