import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { GuardService } from './services/guard.guard';  // Importamos el guard

// Definición de rutas para la aplicación
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [GuardService]  // Protegemos la ruta con el GuardService
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then(m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'iniciosesion',
    loadChildren: () => import('./pages/iniciosesion/iniciosesion.module').then(m => m.IniciosesionPageModule)
  },
  {
    path: 'agendar',
    loadChildren: () => import('./pages/agendar/agendar.module').then(m => m.AgendarPageModule),
    canActivate: [GuardService]  // Protegemos la ruta con el GuardService
  },
  {
    path: 'list-piezas',
    loadChildren: () => import('./pages/list-piezas/list-piezas.module').then(m => m.ListPiezasPageModule),
    canActivate: [GuardService]  // Protegemos la ruta con el GuardService
  },
  {
    path: 'add-pieza',
    loadChildren: () => import('./pages/add-pieza/add-pieza.module').then(m => m.AddPiezaPageModule),
    canActivate: [GuardService]  // Protegemos la ruta con el GuardService
  },
  {
    path: 'edit-pieza/:id',
    loadChildren: () => import('./pages/edit-pieza/edit-pieza.module').then(m => m.EditPiezaPageModule),
    canActivate: [GuardService]  // Protegemos la ruta con el GuardService
  },
  {
    path: 'error404',
    loadChildren: () => import('./pages/error404/error404.module').then(m => m.Error404PageModule)
  },
  {
    path: 'geolocalizacion',
    loadChildren: () => import('./geolocalizacion/geolocalizacion.module').then(m => m.GeolocalizacionPageModule),
    canActivate: [GuardService]  // Protegemos la ruta con el GuardService
  },
  {
    path: 'recuperarcontrasena',
    loadChildren: () => import('./pages/recuperarcontrasena/recuperarcontrasena.module').then( m => m.RecuperarcontrasenaPageModule)
  },
  
  
  {
    path: 'cambiar-contrasena',
    loadChildren: () => import('./pages/cambiar-contrasena/cambiar-contrasena.module').then( m => m.CambiarContrasenaPageModule)
  },
  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then( m => m.CamaraPageModule),
    canActivate: [GuardService]  // Protegemos la ruta con el GuardService
  },
  {
    path: 'mecanicos',
    loadChildren: () => import('./pages/mecanicos/mecanicos.module').then( m => m.MecanicosPageModule),
    canActivate: [GuardService]  // Protegemos la ruta con el GuardService
  },
  {
    path: 'ayuda',
    loadChildren: () => import('./pages/ayuda/ayuda.module').then( m => m.AyudaPageModule),
    canActivate: [GuardService]  // Protegemos la ruta con el GuardService
  }



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
