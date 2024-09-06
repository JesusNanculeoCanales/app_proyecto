import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  username: string = 'Invitado';  // Valor por defecto si no hay usuario

  constructor(private router: Router) {
    // Verifica si hay datos de navegación disponibles
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state && navigation.extras.state['username']) {
      this.username = navigation.extras.state['username'];
    }
  }

  ngOnInit() {}
}