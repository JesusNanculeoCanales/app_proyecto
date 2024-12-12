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

  mecanicos: any[] = [];

  constructor(
     private router: Router,
    private db: BasededatosService,
  private alertController: AlertController,
private toastController: ToastController) {}

  listaMecanico: any;

  ngOnInit() {
    this.db.dbState().subscribe(res => {
      //si esta lista la BD
      if (res) {
        this.db.fetchMecanicos().subscribe(item => {
          this.listaMecanico = item
        })

      }
    })
  
  }

}


