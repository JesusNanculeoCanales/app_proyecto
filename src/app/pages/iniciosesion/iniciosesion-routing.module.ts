import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IniciosesionPage } from './iniciosesion.page';  // Asegúrate de que la página esté correctamente importada

const routes: Routes = [
  {
    path: '',
    component: IniciosesionPage  // Asegúrate de usar el componente correcto
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IniciosesionPageRoutingModule {}
