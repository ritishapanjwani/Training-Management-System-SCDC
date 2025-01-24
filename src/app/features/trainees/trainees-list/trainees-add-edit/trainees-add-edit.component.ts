import { Component,Inject,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgramService } from 'src/app/core/services/programs.service';
import { SnackBarService } from 'src/app/core/services/snackBar.service';
import { TraineeService } from 'src/app/core/services/trainees.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@Component({
  selector: 'app-trainees-add-edit',
  templateUrl: './trainees-add-edit.component.html',
  styleUrls: ['./trainees-add-edit.component.scss']
})
export class TraineesAddEditComponent {
  groupedTrainees: any[] = [];
  traineeForm!: FormGroup;
  selectedTrainee: any = null;
  currentStatusOptions: string[] = ["In Training", "Completed", "On Leave"];
  // selectedStatus: string = 'Availabel';


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TraineesAddEditComponent>,
    private snackBar: SnackBarService,
    private traineeService: TraineeService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.traineeForm = this.fb.group({
      name: ['', Validators.required],
      hiringBusinessUnit: ['', Validators.required],
      joiningDate: ['', Validators.required],
      location: ['',Validators.required],
      mappedBusinessUnit: [''],
      currentStatus: ['In Training', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchGroupedTrainees();
    this.traineeForm.patchValue(this.data);
        if (this.data) {
      this.traineeForm.patchValue({
        name: this.data.name,
        hiringBusinessUnit: this.data.hiringBusinessUnit,
        joiningDate: Array.isArray(this.data.joiningDate)
        ? this.data.joiningDate.join(', ')
        : this.data.joiningDate,
        location: Array.isArray(this.data.location)
        ? this.data.location.flat().join(', ')
        : this.data.location, // Assuming `topics` is an array of arrays
        mappedBusinessUnit: this.data.mappedBusinessUnit,
        currentStatus: this.data.currentStatus || 'In Training'
      });

      console.log('Patched Status:', this.traineeForm.get('currentStatus')?.value);

      this.traineeService.getGroupedTrainees().subscribe({
        next: (response) => {
          this.groupedTrainees = response;

          // Find the corresponding trainer object
          const selectedTrainee = this.groupedTrainees.find(
            (trainee) => trainee.trainee === this.data.name
          );

          if (selectedTrainee) {
            this.traineeForm.patchValue({ name: selectedTrainee });
          }
        },
        error: (err) => {
          // this.snackBar.openSnackBar('Failed to load trainees', 'Close');
        }
      });
    }
  }

  printForm(){
    console.log(this.traineeForm.valid)
  }

  fetchGroupedTrainees(): void {
    this.traineeService.getGroupedTrainees().subscribe({
      next: (response) => {
        this.groupedTrainees = response;
      },
      error: (err) => {
        // this.snackBar.openSnackBar('Failed to load trainees', 'Close');
      }
    });
  }

  onFormSubmit(): void {
    if (this.traineeForm.valid) {
      // Prepare the form data
      const formData = { ...this.traineeForm.value };

      console.log('Form data:', formData);

      // Check if it's an update or a new creation
      if (this.data && this.data._id) {
        // Update existing trainee
        this.traineeService.updateTrainee(this.data._id, formData).subscribe({
          next: (res) => {
            console.log('Trainee updated successfully:', res);
            this.snackBar.openSnackBar('Trainee updated successfully', 'Close');
            this.dialogRef.close(true); // Close dialog with success response
          },
          error: (error) => {
            console.error('Error updating trainee:', error);
            this.snackBar.openSnackBar(
              `Error updating trainee: ${error.message || 'Unknown error'}`,
              'Close'
            );
          },
        });
      } else {
        // Create new trainee
        this.traineeService.createTrainee(formData).subscribe({
          next: (res) => {
            console.log('Trainee added successfully:', res);
            this.snackBar.openSnackBar('Trainee added successfully', 'Close');
            this.dialogRef.close(true); // Close dialog with success response
          },
          error: (err) => {
            console.error('Error adding trainee:', err);
            this.snackBar.openSnackBar(
              `Error adding trainee: ${err.message || 'Unknown error'}`,
              'Close'
            );
          },
        });
      }
    } else {
      // Mark all form fields as touched to display validation errors
      this.markFormGroupTouched(this.traineeForm);
      console.error('Form is invalid. Please correct the errors.');
      this.snackBar.openSnackBar('Form is invalid. Please correct the errors.', 'Close');
    }
  }

  //Helper function to mark all controls in the form group as touched
  private markFormGroupTouched(formGroup: FormGroup): void {
    Object.values(formGroup.controls).forEach((control) => {
      if (control instanceof FormGroup) {
        this.markFormGroupTouched(control);
      } else {
        control.markAsTouched();
      }
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }


}


