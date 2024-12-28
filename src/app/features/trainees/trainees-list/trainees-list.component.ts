import { Component,Inject,OnInit } from '@angular/core';
import { SnackBarService } from 'src/app/core/services/snackBar.service';
import { TraineeService } from 'src/app/core/services/trainees.service';
import { Trainee } from 'src/app/core/interfaces/trainees.interface';
import { MatDialog } from '@angular/material/dialog';
import { TraineesAddEditComponent } from './trainees-add-edit/trainees-add-edit.component';
import { animate, style, transition, trigger } from '@angular/animations';


@Component({
  selector: 'app-trainees-list',
  templateUrl: './trainees-list.component.html',
  styleUrls: ['./trainees-list.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.5s', style({ opacity: 1 }))
      ])
    ])
  ]
})
export class TraineesListComponent {
  trainees: Trainee[] = [];



    constructor(private traineeService: TraineeService, private dialog: MatDialog, private snackBar: SnackBarService) {}

    ngOnInit(): void {
      this.getTrainees();
    }



  getTrainees(): void{
  this.traineeService.getAllTrainees().subscribe({
    next: (res) =>{
      this.trainees = res;
      console.log(this.trainees);
    },
    error: (err) =>{
      console.log("Error occured while getting data", err);
    }
  });

  }

    createTrainee(traineeData: any) {
      // this.programService.createTrainer(trainerData).subscribe({
      //   next: (res) => {
      //     this.getGroupedTrainers(); // Refresh the list after adding a new trainer
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   }
      // });
    }



      openAddEditForm() {
       const dialogRef = this.dialog.open(TraineesAddEditComponent);
       dialogRef.afterClosed().subscribe({
        next:(res)=>{
          if(res){
            this.getTrainees();
          }
        }
       })

      }

      openEditForm(data:any){
          const dailogRef= this.dialog.open(TraineesAddEditComponent,{
            data:data
          });
          dailogRef.afterClosed().subscribe({
              next:(res)=>{
                if(res){
                  this.getTrainees();
                }
              }
             });
        }

    deleteProgram(id: string): void {
      // Logic to delete a program
      this.traineeService.deleteTrainee(id).subscribe({
        next:(res)=>{
          console.log("Trainee deleted successfully!");
          this.snackBar.openSnackBar("Trainee deleted", 'Success');
          this.getTrainees();
        },
        error(err) {
            console.log(err);
        },
      });
    }

}
