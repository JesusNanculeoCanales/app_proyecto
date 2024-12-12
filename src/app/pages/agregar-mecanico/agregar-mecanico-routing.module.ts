import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AgregarMecanicoPage } from './agregar-mecanico.page';

const routes: Routes = [
  {
    path: '',
    component: AgregarMecanicoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgregarMecanicoPageRoutingModule {}
