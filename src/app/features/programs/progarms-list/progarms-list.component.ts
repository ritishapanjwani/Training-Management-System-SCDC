import { Component, OnInit,ViewChild } from '@angular/core';
import { ProgramService } from 'src/app/core/services/programs.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProgramsAddEditComponent } from './programs-add-edit/programs-add-edit.component';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Program } from 'src/app/core/interfaces/programs.interface';



@Component({
  selector: 'app-progarms-list',
  templateUrl: './progarms-list.component.html',
  styleUrls: ['./progarms-list.component.scss']
})
export class ProgarmsListComponent implements OnInit{
  // programForm: FormGroup;
  displayedColumns: string[] = ['module', 'trainer', 'trainingMode', 'status','startDate','endDate','startTime','endTime','dayHour', 'topics'];
  dataSource!: MatTableDataSource<any>;
  programs: Program[] | null = null;



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private programService: ProgramService, private dialog:MatDialog) {

  }

  ngOnInit(): void {
    this.fetchProgramDetails();
  }

  fetchProgramDetails(): void {
    this.programService.getPrograms().subscribe({
      next: (programs: Program[]) => {
        console.log('Programs fetched:', programs);
        this.programs = programs; // Assign fetched data to the local variable
      },
      error: (err) => {
        console.error('Error fetching programs:', err);
      }
    });
  }

  editProgram(program: Program): void {
    console.log('Edit program clicked for:', program);
    // Add logic to navigate or open a modal for editing the program
  }
  // Event handler for delete button
  deleteProgram(programId: string): void {
    console.log('Delete program clicked for ID:', programId);
    // Add logic to delete the program
  }

  openAddEditForm() {
    this.dialog.open(ProgramsAddEditComponent);
  }
}

