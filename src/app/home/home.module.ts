import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Proporciona componentes de la librería Ionic (botones, listas, menús, etc.)
import { FormsModule } from '@angular/forms';  // Módulo para manejar formularios template-driven en Angular
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule, // Habilita el uso de componentes de Ionic en la página
    HomePageRoutingModule // Define las rutas específicas para la página HomePage
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
