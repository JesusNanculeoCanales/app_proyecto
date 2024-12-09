import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mecanicos',
  templateUrl: './mecanicos.page.html',
  styleUrls: ['./mecanicos.page.scss'],
})
export class MecanicosPage implements OnInit {
  mecanicos = [
    {
      id: 1,
      nombre: 'Bastian Nuñez',
      especialidad: 'Frenos y Suspensión',
      localidad: 'Santiago, Chile',
      foto: 'assets/icon/mecanico.jpeg', // Asegúrate de que esta ruta sea correcta
    },
    {
      id: 2,
      nombre: 'Joel Salas',
      especialidad: 'Motores',
      localidad: 'Valparaíso, Chile',
      foto: 'assets/icon/mecanico1.jpg', // Cambia según tu estructura
    },
    {
      id: 3,
      nombre: 'Benjamin Lizama',
      especialidad: 'Transmisión',
      localidad: 'Concepción, Chile',
      foto: 'assets/icon/mecanico2.jpeg', // Cambia según tu estructura
    },
  ];

  constructor() {}

  ngOnInit() {}
}
