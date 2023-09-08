import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainPage } from './main.page';

const routes: Routes = [
  {
    path: '',
    component: MainPage,
    children: [
      {
        path: 'reportes',
        loadChildren: () =>
          import('../reportes/reportes.module').then(
            (m) => m.ReportesPageModule
          ),
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('../usuarios/usuarios.module').then(
            (m) => m.UsuariosPageModule
          ),
      },
      {
        path: '',
        redirectTo: 'reportes',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'reportes',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainPageRoutingModule {}
