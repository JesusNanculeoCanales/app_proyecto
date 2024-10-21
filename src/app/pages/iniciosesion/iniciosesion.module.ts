import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { IniciosesionPageRoutingModule } from './iniciosesion-routing.module';
import { IniciosesionPage } from './iniciosesion.page';  // Importa correctamente la página

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IniciosesionPageRoutingModule
  ],
  declarations: [IniciosesionPage]  // Declara el componente aquí
})
export class IniciosesionPageModule {}
