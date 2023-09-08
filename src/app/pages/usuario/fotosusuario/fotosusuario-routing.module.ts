import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FotosusuarioPage } from './fotosusuario.page';

const routes: Routes = [
  {
    path: '',
    component: FotosusuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FotosusuarioPageRoutingModule {}
