import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'inicio',
        loadChildren: () =>
          import('../inicio/inicio.module').then((m) => m.InicioPageModule),
      },
      {
        path: 'publicar',
        loadChildren: () =>
          import('../publicar/publicar.module').then(
            (m) => m.PublicarPageModule
          ),
      },
      {
        path: 'misfotos',
        loadChildren: () =>
          import('../misfotos/misfotos.module').then(
            (m) => m.MisfotosPageModule
          ),
      },
      {
        path: 'detalles',
        loadChildren: () =>
          import('../detalles/detalles.module').then(
            (m) => m.DetallesPageModule
          ),
      },
      {
        path: 'personas',
        loadChildren: () =>
          import('../personas/personas.module').then(
            (m) => m.PersonasPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'inicio',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
