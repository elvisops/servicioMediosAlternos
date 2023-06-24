import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnviarCorreoComponent } from './modules/administracion/enviar-correo/enviar-correo.component';

const routes: Routes = [
  { path: '', component: EnviarCorreoComponent},
  { path: 'enviar/:tipo/:crm/:usuario/:id/:contacto', component: EnviarCorreoComponent}
];

@NgModule({
  // imports: [RouterModule.forRoot(routes, { useHash: true})], // sirve para las rutas en el servidor
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
