import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-recuperarcontrasena',
  templateUrl: './recuperarcontrasena.page.html',
  styleUrls: ['./recuperarcontrasena.page.scss'],
})
export class RecuperarcontrasenaPage implements OnInit {
  correo = '';
  correoNoEncontrado = false;

  constructor(
    private navCtrl: NavController,
    private db: BasededatosService
  ) {}

  ngOnInit() {}

  async verificarCorreo() {
    // Reiniciar mensaje de error
    this.correoNoEncontrado = false;

    // Buscar en SQLite
    const usuarioSQLite = await this.db.buscarUsuarioPorCorreo(this.correo);
    
    // Buscar en Local Storage
    const usuarioLocalStorage = localStorage.getItem(this.correo);

    if (usuarioSQLite || usuarioLocalStorage) {
      localStorage.setItem('correo_cambio_clave',this.correo)
      this.navCtrl.navigateForward('/cambiar-contrasena');
    } else {
      // Mostrar error si el correo no existe
      this.correoNoEncontrado = true;
    }
  }
}

