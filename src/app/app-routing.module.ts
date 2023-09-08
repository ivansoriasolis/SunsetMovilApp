import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'usuario/main',
    loadChildren: () =>
      import('./pages/usuario/main/main.module').then((m) => m.MainPageModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'inicio',
    loadChildren: () =>
      import('./pages/usuario/inicio/inicio.module').then(
        (m) => m.InicioPageModule
      ),
  },
  {
    path: 'publicar',
    loadChildren: () =>
      import('./pages/usuario/publicar/publicar.module').then(
        (m) => m.PublicarPageModule
      ),
  },
  {
    path: 'misfotos',
    loadChildren: () =>
      import('./pages/usuario/misfotos/misfotos.module').then(
        (m) => m.MisfotosPageModule
      ),
  },
  {
    path: 'detalles',
    loadChildren: () =>
      import('./pages/usuario/detalles/detalles.module').then(
        (m) => m.DetallesPageModule
      ),
  },
  {
    path: 'usuario/miperfil',
    loadChildren: () =>
      import('./pages/usuario/miperfil/miperfil.module').then(
        (m) => m.MiperfilPageModule
      ),
  },

  {
    path: 'usuario/seguidores',
    loadChildren: () =>
      import('./pages/usuario/seguidores/seguidores.module').then(
        (m) => m.SeguidoresPageModule
      ),
  },
  {
    path: 'usuario/siguiendo',
    loadChildren: () =>
      import('./pages/usuario/siguiendo/siguiendo.module').then(
        (m) => m.SiguiendoPageModule
      ),
  },
  {
    path: 'usuario/perfilusuario',
    loadChildren: () =>
      import('./pages/usuario/perfilusuario/perfilusuario.module').then(
        (m) => m.PerfilusuarioPageModule
      ),
  },
  {
    path: 'usuario/fotosusuario',
    loadChildren: () =>
      import('./pages/usuario/fotosusuario/fotosusuario.module').then(
        (m) => m.FotosusuarioPageModule
      ),
  },
  {
    path: 'personas',
    loadChildren: () =>
      import('./pages/usuario/personas/personas.module').then(
        (m) => m.PersonasPageModule
      ),
  },
  {
    path: 'administrador/main',
    loadChildren: () =>
      import('./pages/administrador/main/main.module').then(
        (m) => m.MainPageModule
      ),
  },  {
    path: 'reportes',
    loadChildren: () => import('./pages/administrador/reportes/reportes.module').then( m => m.ReportesPageModule)
  },
  {
    path: 'usuarios',
    loadChildren: () => import('./pages/administrador/usuarios/usuarios.module').then( m => m.UsuariosPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/about/about.module').then( m => m.AboutPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
