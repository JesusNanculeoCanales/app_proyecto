import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mecanicos',
  templateUrl: './mecanicos.page.html',
  styleUrls: ['./mecanicos.page.scss'],
})
export class MecanicosPage implements OnInit {
  listaMecanico: any[] = [];

  constructor(
    private router: Router,
    private db: BasededatosService,
    private alertController: AlertController,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    // Cargar los mecánicos desde la base de datos
    this.cargarMecanicos();
  }

  ionViewWillEnter() {
    // Recargar la lista de mecánicos cuando se regresa a la página
    this.cargarMecanicos();
  }

  cargarMecanicos() {
    this.db.fetchMecanicos().subscribe((item) => {
      this.listaMecanico = item;
    });
  }

  // CREAR ALERTA PARA ELIMINAR
  async crearAlertaELIMINAR(id_mecanico: any) {
    const alert = await this.alertController.create({
      header: '¿Quiere eliminar este mecánico?',
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.db.borrarMecanico(id_mecanico).then(() => {
              this.crearToastEliminado();
            }).catch((err) => {
              console.error('Error al eliminar mecánico:', err);
              this.db.presentAlert('Error al eliminar el mecánico: ' + err.message);
            });
          },
        },
        {
          text: 'Cancelar',
        },
      ],
    });

    await alert.present();
  }

  // MOSTRAR MENSAJE DE ELIMINACIÓN EXITOSA
  async crearToastEliminado() {
    const toast = await this.toastController.create({
      icon: 'checkmark-circle',
      message: 'Mecánico eliminado exitosamente.',
      duration: 3000,
      position: 'top',
      cssClass: 'custom-toast',
      buttons: [
        {
          icon: 'close',
          role: 'cancel',
        },
      ],
    });

    await toast.present();
  }

  // MÉTODO PARA EDITAR MECÁNICOS
  editarMecanico(mecanico: any) {
    let navigationExtras: NavigationExtras = {
      state: {
        id_mecanico: mecanico.id_mecanico,
        nombre: mecanico.nombre,
        imagen: mecanico.imagen,
        especialidad: mecanico.especialidad,
        localidad: mecanico.localidad,
        mail: mecanico.mail,
        contacto: mecanico.contacto,
      },
    };
    this.router.navigate(['/editar-mecanico'], navigationExtras);
  }
}
