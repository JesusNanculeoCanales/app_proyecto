import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PiezasPageRoutingModule } from './piezas-routing.module';

import { PiezasPage } from './piezas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PiezasPageRoutingModule
  ],
  declarations: [PiezasPage]
})
export class PiezasPageModule {}
