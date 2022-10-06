import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DetallePageModule } from './home/detalle/detalle.module';

const routes: Routes = [
  {
    path: '', redirectTo: 'login', pathMatch: 'full'
  },
  {
    path: 'home/:user',
    //loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
    children: [
      {
        path: '',
        loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
      },
      {
        path: ':id',
        loadChildren: () => import('./home/detalle/detalle.module').then(m => m.DetallePageModule)
      }
    ]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.PassRessetPageModule)
  },
  {
    path: 'historial',
    loadChildren: () => import('./historial/historial.module').then( m => m.HistorialPageModule)
  },
  {
    path: 'home-conductor/:user',
    loadChildren: () => import('./home-conductor/home-conductor.module').then( m => m.HomeConductorPageModule)
  },
  {
    path: "agregar",
    loadChildren: () => import('./home/agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then( m => m.ConfiguracionPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
