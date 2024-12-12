import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AgregarMecanicoPageRoutingModule } from './agregar-mecanico-routing.module';

import { AgregarMecanicoPage } from './agregar-mecanico.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AgregarMecanicoPageRoutingModule
  ],
  declarations: [AgregarMecanicoPage]
})
export class AgregarMecanicoPageModule {}
