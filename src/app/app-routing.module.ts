import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EtapaAddPageModule } from './pages/_etapas/etapa-add/etapa-add.module';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () => import('./tab1/tab1.module').then(m => m.Tab1PageModule)
  // },
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'compras',
    loadChildren: () => import('./pages/compras/compras.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'cuenta',
    loadChildren: () => import('./pages/ajustes/ajustes.module').then(m => m.Tab3PageModule)
  },
  {
    path: 'publicaciones-list',
    loadChildren: () => import('./pages/_productos/producto-list/producto-list.module').then(m => m.ProductoListPageModule)
  },
  // ! Productos
  {
    path: 'publicacion-add',
    loadChildren: () => import('./pages/_productos/producto-add/producto-add.module').then(m => m.ProdcutoAddPageModule)
  },
  {
    path: 'publicacion-edit/:id',
    loadChildren: () => import('./pages/_productos/producto-edit/producto-edit.module').then(m => m.ProductEditPageModule)
  },

  // ! Etapas
  {
    path: 'etapas/:id',
    loadChildren: () => import(
      './pages/_etapas/etapas-producto/etapas-producto.module').then(m => m.EtapasPageModule)
  },
  {
    path: 'etapa-add/:id',
    loadChildren: () => import(
      './pages/_etapas/etapa-add/etapa-add.module').then(m => m.EtapaAddPageModule)
  },



  {
    path: 'login', loadChildren: () => import('./pages/_usuarios/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/_usuarios/profile/profile.module').then(m => m.ProfilePageModule),
    // canLoad: [UsuarioGuard]
  },
  {
    path: '',
    redirectTo: '/inicio',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
