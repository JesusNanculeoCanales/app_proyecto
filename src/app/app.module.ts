import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContrasenamodalComponent } from './componentes/contrasenamodal/contrasenamodal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  //  módulo de animaciones
import { HttpClientModule } from '@angular/common/http';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx'; //sql

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
    BrowserAnimationsModule  // modulo animaciones
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite  // se agrego sqlite
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
