import { Component, OnInit } from '@angular/core';
import { PiezaService } from '../../services/pieza.service';
import { Router } from '@angular/router';
import { BasededatosService } from 'src/app/services/basededatos.service';
import { AlertController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-list-piezas',
  templateUrl: './list-piezas.page.html',
  styleUrls: ['./list-piezas.page.scss'],
})
export class ListPiezasPage implements OnInit {

  piezas: any[] = [];

  constructor(private piezaService: PiezaService,
     private router: Router,
    private db: BasededatosService,
  private alertController: AlertController,
private toastController: ToastController) {}




  listaPiezas: any;

  ngOnInit() {
    this.piezaService.getPiezas().subscribe(data => {
      this.piezas = data;  // Obtener las piezas de la API
    });

    //me subscribo al observable del status de la BD
    this.db.dbState().subscribe(res => {
      //si esta lista la BD
      if (res) {
        this.db.fetchPiezas().subscribe(item => {
          this.listaPiezas = item
        })
      }
    })
  
  }

  //CREAR ALERTA
  async crearAlertaELIMINAR(id_pieza: any) {
    const alert = await this.alertController.create({
      header: "¿Quiere Eliminar esta Pieza?",
      buttons: [
        {
          text: 'Eliminar',
          handler: () => {
            this.crearToastEliminado();
            this.db.borrarPiezas(id_pieza);
          }
        },
        {
          text: 'Cancelar',
          handler: () => {

          }
        },
      ],
    });

    await alert.present();
  }

  // MOSTRAR MENSAJE DE BORRADO
  /* BOTONES DEL TOAST */
  async crearToastEliminado() {
    const toast = await this.toastController.create({
      icon: 'checkmark-circle',
      message: 'Eliminado Exitosamente!',
      duration: 4000,
      position: 'top',
      cssClass: "custom-toast",
      buttons: [
        {
          icon: 'close',
          role: 'cancel'
        }
      ],
    });

    await toast.present();
  }
  public toastButtons = [
    {
      icon: 'close',
    },
  ];

}

