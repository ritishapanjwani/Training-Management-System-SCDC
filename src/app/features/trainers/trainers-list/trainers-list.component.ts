import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TrainersAddEditComponent } from './trainers-add-edit/trainers-add-edit.component';
import { Trainer } from 'src/app/core/interfaces/trainers.interface';
import { SnackBarService } from 'src/app/core/services/snackBar.service';
import { TrainerService } from 'src/app/core/services/trainers.service';



@Component({
  selector: 'app-trainers-list',
  templateUrl: './trainers-list.component.html',
  styleUrls: ['./trainers-list.component.scss']
})
export class TrainersListComponent implements OnInit {
  trainers: Trainer[] = [];



  constructor(private trainerService: TrainerService, private dialog: MatDialog, private snackBar: SnackBarService) {}

  ngOnInit(): void {
    this.getTrainers();
  }



getTrainers(): void{
this.trainerService.getAllTrainers().subscribe({
  next: (res) =>{
    this.trainers = res;
    console.log(this.trainers);
  },
  error: (err) =>{
    console.log("Error occured while getting data", err);
  }
});

}

  createTrainer(trainerData: any) {
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
     const dialogRef = this.dialog.open(TrainersAddEditComponent);
     dialogRef.afterClosed().subscribe({
      next:(res)=>{
        if(res){
          this.getTrainers();
        }
      }
     })

    }

    openEditForm(data:any){
        const dailogRef= this.dialog.open(TrainersAddEditComponent,{
          data:data
        });
        dailogRef.afterClosed().subscribe({
            next:(res)=>{
              if(res){
                this.getTrainers();
              }
            }
           });
      }

  deleteProgram(id: string): void {
    // Logic to delete a program
    this.trainerService.deleteTrainer(id).subscribe({
      next:(res)=>{
        console.log("Trainer deleted successfully!");
        this.snackBar.openSnackBar("Trainer deleted", 'Success');
        this.getTrainers();
      },
      error(err) {
          console.log(err);
      },
    });
  }

}
