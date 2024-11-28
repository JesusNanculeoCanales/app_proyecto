import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CamaraPage } from './camara.page';  // Asegúrate de importar la página de cámara

const routes: Routes = [
  {
    path: '',
    component: CamaraPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CamaraPageRoutingModule {}
