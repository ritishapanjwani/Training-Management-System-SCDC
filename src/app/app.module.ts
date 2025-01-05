import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterOutlet } from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TraineesListComponent } from './features/trainees/trainees-list/trainees-list.component';
import { TraineesAddEditComponent } from './features/trainees/trainees-list/trainees-add-edit/trainees-add-edit.component';

import { ProgramsModule } from './features/programs/programs.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatDatepickerModule, MatDateRangePicker } from '@angular/material/datepicker';
import { MatChipGridChange } from '@angular/material/chips';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './login/home/home.component';
import { LoginComponent } from './login/login/login.component';
import { RegisterComponent } from './login/register/register.component';
import { AddColumnComponent } from './features/scores/add-column/add-column.component';
import { ScoreCardComponent } from './features/scores/score-card/score-card.component';
import { CreateScoreCardComponent } from './features/scores/create-score-card/create-score-card.component';
import { ViewTopicComponent } from './features/scores/view-topic/view-topic.component';
import { ViewTraineeReportComponent } from './features/scores/view-trainee-report/view-trainee-report.component';
import { MatColumnDef, MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

//creating a constant array of all the modules
const uxModules = [
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatToolbarModule,
  RouterOutlet
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    TraineesListComponent,
    AddColumnComponent,
    CreateScoreCardComponent,
    ScoreCardComponent,
    ViewTopicComponent,
    ViewTraineeReportComponent,
    TraineesAddEditComponent,
    ScoreCardComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    MatInputModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatDividerModule,
    ProgramsModule,
    MatDialogModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    uxModules
  ],
  providers: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
