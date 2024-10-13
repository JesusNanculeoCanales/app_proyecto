import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';  // Importa el guard que has creado

// Definición de rutas para la aplicación
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)

  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'iniciosesion',
    loadChildren: () => import('./pages/iniciosesion/iniciosesion.module').then( m => m.IniciosesionPageModule)
  },
  {
    path: 'agendar',
    loadChildren: () => import('./pages/agendar/agendar.module').then( m => m.AgendarPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'list-piezas',
    loadChildren: () => import('./pages/list-piezas/list-piezas.module').then( m => m.ListPiezasPageModule)
  },
  {
    path: 'add-pieza',
    loadChildren: () => import('./pages/add-pieza/add-pieza.module').then( m => m.AddPiezaPageModule)
  },
  {
    path: 'edit-pieza/:id',
    loadChildren: () => import('./pages/edit-pieza/edit-pieza.module').then( m => m.EditPiezaPageModule)
  },  {
    path: 'error404',
    loadChildren: () => import('./pages/error404/error404.module').then( m => m.Error404PageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { } // Define y exporta el módulo de enrutamiento principal de la aplicación
