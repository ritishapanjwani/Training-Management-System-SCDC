import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainersListComponent } from '../trainers/trainers-list/trainers-list.component';
import { TrainersAddEditComponent } from '../trainers/trainers-list/trainers-add-edit/trainers-add-edit.component';
import { ProgarmsListComponent } from './progarms-list/progarms-list.component';
import { ProgramsAddEditComponent } from './progarms-list/programs-add-edit/programs-add-edit.component';


@NgModule({
  declarations: [
    TrainersListComponent,
    TrainersAddEditComponent,
    ProgarmsListComponent,
    ProgramsAddEditComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ]
})
export class ProgramsModule { }
