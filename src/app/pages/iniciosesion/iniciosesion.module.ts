import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IniciosesionPageRoutingModule } from './iniciosesion-routing.module';
import { IniciosesionPage } from './iniciosesion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  
    IonicModule,
    IniciosesionPageRoutingModule
  ],
  declarations: [IniciosesionPage] // Declara la página de inicio de sesión como parte de este módulo
})
export class IniciosesionPageModule {}
