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
import { SnackBarService } from 'src/app/core/services/snackBar.service';



@Component({
  selector: 'app-progarms-list',
  templateUrl: './progarms-list.component.html',
  styleUrls: ['./progarms-list.component.scss']
})
export class ProgarmsListComponent implements OnInit{
 

  programs: Program[] = [];
  groupedPrograms: any[] = [];



  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private fb: FormBuilder, private programService: ProgramService, private dialog:MatDialog, private snackBar: SnackBarService) {

  }

  ngOnInit(): void {
    this.fetchProgramDetails();
  }

  // fetchProgramDetails(): void {
  //   this.programService.getPrograms().subscribe({
  //     next: (programs: Program[]) => {
  //       console.log('Programs fetched:', programs);
  //       this.programs = programs; // Assign fetched data to the local variable
  //     },
  //     error: (err) => {
  //       console.error('Error fetching programs:', err);
  //     }
  //   });
  // }

  fetchProgramDetails(): void {
    this.programService.getPrograms().subscribe({
      next: (programs: Program[]) => {
        console.log('Programs fetched:', programs);
        this.groupProgramsByModule(programs); // Group the fetched programs by module
      },
      error: (err) => {
        console.error('Error fetching programs:', err);
      }
    });
  }


  groupProgramsByModule(programs: Program[]): void {
    // Define the accumulator type explicitly
    const grouped: { [key: string]: { module: string; trainers: Program[] } } = programs.reduce(
      (acc, program) => {
        // Check if the module is already in the accumulator
        if (!acc[program.module]) {
          acc[program.module] = {
            module: program.module,
            trainers: [program], // Initialize with the current program as the first trainer
          };
        } else {
          // If the module exists, add the program to the trainers array
          acc[program.module].trainers.push(program);
        }
        return acc;
      },
      {} as { [key: string]: { module: string; trainers: Program[] } } // Initialize the accumulator with the correct type
    );
  
    // Convert the grouped object into an array to bind to the template
    this.groupedPrograms = Object.values(grouped);
  }


  

  



 
  // Event handler for delete button
  deleteProgram(id: string): void {
    console.log('Delete program clicked for ID:', id);
    this.programService.deleteProgram(id).subscribe({
      next:(response)=>{
        console.log('Program deleted:', response);
        this.snackBar.openSnackBar('Program deleted', 'Success');
        this.fetchProgramDetails();
      }
    })
    
  }
  editPorgram(id:string, program: Program):void{
    console.log('Edit program clicked for:', program);

    this.programService.updateProgram(id,program).subscribe({
    next:(respons)=>{
      console.log('Program updated:', respons);
      this.snackBar.openSnackBar('Program updated', 'Success'); 
      this.fetchProgramDetails();
    }
    });
    
  }

  openAddEditForm() {
   const dialogRef = this.dialog.open(ProgramsAddEditComponent);
   dialogRef.afterClosed().subscribe({
    next:(res)=>{
      if(res){
        this.fetchProgramDetails();
      }
    }
   })
    
  }

  openEditForm(data:any){
    const dailogRef= this.dialog.open(ProgramsAddEditComponent,{
      data:data
    });
    dailogRef.afterClosed().subscribe({
        next:(res)=>{
          if(res){
            this.fetchProgramDetails();
          }
        }
       });
    
 
  }
}

