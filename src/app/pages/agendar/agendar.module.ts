import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AgendarPageRoutingModule } from './agendar-routing.module';
import { AgendarPage } from './agendar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Asegúrate de importar ReactiveFormsModule si lo usas
    IonicModule,
    AgendarPageRoutingModule
  ],
  declarations: [AgendarPage]
})
export class AgendarPageModule {}
