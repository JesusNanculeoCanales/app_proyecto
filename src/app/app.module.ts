import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
<<<<<<< HEAD
import { ContrasenamodalComponent } from './componentes/contrasenamodal/contrasenamodal.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importa BrowserAnimationsModule
=======
import { ContrasenamodalComponent } from './componentes/contrasenamodal/contrasenamodal.component';  // Asegúrate de importar el modal
>>>>>>> parent of e521119 (Merge pull request #11 from JesusNanculeoCanales/Jesus)

@NgModule({
  declarations: [
    AppComponent,
    ContrasenamodalComponent,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule  // Añade BrowserAnimationsModule aquí
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
