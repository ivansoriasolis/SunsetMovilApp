import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiguiendoPage } from './siguiendo.page';

const routes: Routes = [
  {
    path: '',
    component: SiguiendoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SiguiendoPageRoutingModule {}
