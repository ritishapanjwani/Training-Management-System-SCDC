import { Component, Inject, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/core/services/programs.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/core/services/snackBar.service';
import { TrainerService } from 'src/app/core/services/trainers.service';
import { formatNumber } from '@angular/common';

@Component({
  selector: 'app-trainers-add-edit',
  templateUrl: './trainers-add-edit.component.html',
  styleUrls: ['./trainers-add-edit.component.scss']
})
export class TrainersAddEditComponent implements OnInit {
  groupedTrainers: any[] = [];
  trainerForm!: FormGroup;
  selectedTrainer: any = null;
  status: string[] = ['Available', 'Not Available'];
  // selectedStatus: string = 'Available';


  constructor(
    private programService: ProgramService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TrainersAddEditComponent>,
    private snackBar: SnackBarService,
    private trainerService: TrainerService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.trainerForm = this.fb.group({
      trainerName: ['', Validators.required],
      businessUnit: ['', Validators.required],
      status: ['Availabel', Validators.required],
      expertise:[''],
      modules: ['', Validators.required],
      topics: ['', Validators.required],
      noOfHours: [0, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    this.fetchGroupedTrainers();
    this.trainerForm.patchValue(this.data);
        if (this.data) {
      this.trainerForm.patchValue({
        trainerName: this.data.trainerName,
        businessUnit: this.data.businessUnit,
        modules: this.data.module?.join(', '), // Assuming `module` is an array
        topics: this.data.topics?.flat().join(', '), // Assuming `topics` is an array of arrays
        noOfHours: this.data.noOfHours,
        expertise: this.data.expertise,
        status: this.data.status || 'Available'



      });

      console.log('Patched Status:', this.trainerForm.get('status')?.value);

      this.programService.getGroupedTrainers().subscribe({
        next: (response) => {
          this.groupedTrainers = response;

          // Find the corresponding trainer object
          const selectedTrainer = this.groupedTrainers.find(
            (trainer) => trainer.trainer === this.data.trainerName
          );

          if (selectedTrainer) {
            this.trainerForm.patchValue({ trainerName: selectedTrainer });
          }
        },
        error: (err) => {
          this.snackBar.openSnackBar('Failed to load trainers', 'Close');
        }
      });
    }
  }

  printForm(){
    console.log(this.trainerForm.valid)
  }
  fetchGroupedTrainers(): void {
    this.programService.getGroupedTrainers().subscribe({
      next: (response) => {
        this.groupedTrainers = response;
      },
      error: (err) => {
        this.snackBar.openSnackBar('Failed to load trainers', 'Close');
      }
    });
  }

  onTrainerSelect(trainer: any): void {
    if (trainer) {
      // Update read-only fields
      this.trainerForm.patchValue({
        modules: trainer.modules.join(', '),
        topics: trainer.topics.flat().join(', '),
        noOfHours: trainer.totalDayHour
      });
    } else {
      // Clear read-only fields if no trainer selected
      this.trainerForm.patchValue({
        modules: '',
        topics: '',
        noOfHours: ''
      });
    }
  }

  onFormSubmit(): void {
    if (this.trainerForm.valid) {
      const formData = { ...this.trainerForm.value };
      console.log(formData);

      // Normalize trainerName and extract nested fields
      formData.trainerName = formData.trainerName.trainer;

      formData.module = formData.modules
      formData.topics = formData.topics
      formData.noOfHours = formData.noOfHours
      if(this.data){
        this.trainerService.updateTrainer(this.data._id,formData).subscribe({
          next:(res)=>{
            console.log('Trainer updated:', res);

            this.snackBar.openSnackBar('Trainer updated', 'Success');
            this.dialogRef.close(true);
          },
          error:(error)=>{
            console.error('Error updating trainer:', error);
           this.snackBar.openSnackBar('error updating trainer', 'Failed')
         }});

      }else {
      //Sending data to api
      this.trainerService.createTrainer(formData).subscribe({
        next:(res)=>{
          console.log("Trainer added successfully!", res);
          this.snackBar.openSnackBar('Trainer added', 'Success');
          this.dialogRef.close(true);
        },
        error:(err)=>{
          console.error('Error saving trainer:', err);
          this.snackBar.openSnackBar('error adding trainer', 'Failed')
        }
      })
    }
  }else {
      this.markFormGroupTouched(this.trainerForm);

    }
  }

  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

}
