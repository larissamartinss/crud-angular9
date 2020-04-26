import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './componentes/navegacao/home/home.component';
import { CadastrarComponent } from './componentes/clinica/cadastrar/cadastrar.component';
import { ConsultarComponent } from './componentes/clinica/consultar/consultar.component';
import { EditarComponent } from './componentes/clinica/editar/editar.component';



const routes: Routes = [
  {path: '', redirectTo: '\home', pathMatch: 'full'},
  {path : 'home', component: HomeComponent},
  {path : 'cadastrar', component : CadastrarComponent},
  {path : 'consultar', component : ConsultarComponent},
  {path : 'editar/:id', component : EditarComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
