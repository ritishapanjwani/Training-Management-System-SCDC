import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from './admin/default/default.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';

const routes: Routes = [
  {path: '', component:DefaultComponent}, 
  {path:'sidebar', component:SidebarComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
