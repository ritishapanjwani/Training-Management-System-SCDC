import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrainersListComponent } from '../trainers/trainers-list/trainers-list.component';
import { TrainersAddEditComponent } from '../trainers/trainers-list/trainers-add-edit/trainers-add-edit.component';
import { ProgarmsListComponent } from './progarms-list/progarms-list.component';
import { ProgramsAddEditComponent } from './progarms-list/programs-add-edit/programs-add-edit.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import {MatSelectModule} from '@angular/material/select';
// import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
// import {MatTimepickerModule} from '@angular/material/timepicker';






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
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    MatSelectModule,
    
    
    
    
    
  ]
})
export class ProgramsModule { }
