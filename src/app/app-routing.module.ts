import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { ProgramsListComponent } from './features/programs/progarms-list/programs-list.component';
import { TraineesListComponent } from './features/trainees/trainees-list/trainees-list.component';
import { TrainersListComponent } from './features/trainers/trainers-list/trainers-list.component';
import { ProgramsAddEditComponent } from './features/programs/progarms-list/programs-add-edit/programs-add-edit.component';
import { TraineesAddEditComponent } from './features/trainees/trainees-list/trainees-add-edit/trainees-add-edit.component';
import { TrainersAddEditComponent } from './features/trainers/trainers-list/trainers-add-edit/trainers-add-edit.component';
import { HomeComponent } from './login/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { AuthGuard } from './auth.guard';

import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ScoreCardComponent } from './features/scores/score-card/score-card.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {
    path: '',
    component: HeaderComponent,
    canMatch: [AuthGuard],
    children: [
      { path: 'program-list', component: ProgramsListComponent },
      { path: 'trainees-list', component: TraineesListComponent },
      { path: 'trainers-list', component: TrainersListComponent },
      {path:'dashboard',component:DashboardComponent},
      {path:'scores',component:ScoreCardComponent},
    ],
  },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
