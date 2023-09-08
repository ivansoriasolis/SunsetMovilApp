import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MisfotosPage } from './misfotos.page';

const routes: Routes = [
  {
    path: '',
    component: MisfotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MisfotosPageRoutingModule {}
