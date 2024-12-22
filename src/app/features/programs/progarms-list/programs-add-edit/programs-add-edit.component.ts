import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/core/services/programs.service';
import { TrainerService } from 'src/app/core/services/trainers.service';
import { Trainer } from 'src/app/core/interfaces/trainers.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';



@Component({
  selector: 'app-programs-add-edit',
  templateUrl: './programs-add-edit.component.html',
  styleUrls: ['./programs-add-edit.component.scss']
})
export class ProgramsAddEditComponent implements OnInit {
  programForm: FormGroup<any>;
  trainers: Trainer[] = [];
  
  trainingModes:string[] = ['Online', 'Offline'];
  trainingStatus: string[] = ['Scheduled', 'Completed', 'Cancelled'];
  selectedStatus: string = 'Scheduled';


  constructor(
    private fb: FormBuilder,
    private programService: ProgramService,
    private trainerService: TrainerService,
    private dialog: MatDialog
  ) {
    // Initialize form in constructor
    this.programForm = this.fb.group({
      module: ['', Validators.required],
      topics: this.fb.array([], Validators.required),
      dayHour: [0, [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      time: ['', Validators.required],
      trainingMode: ['Online', Validators.required],
      trainer: ['', Validators.required],
      status: ['Scheduled', Validators.required],
      referenceNotes: [''],
    });
  }

  ngOnInit(): void {
    this.loadTrainers();
  }

  private loadTrainers(): void {
    this.trainerService.getAllTrainers().subscribe({
      next: (trainers) => {
        this.trainers = trainers;
      },
      error: (error) => {
        console.error('Error loading trainers:', error);
      }
    });
  }

  get topicsArray(): FormArray {
    return this.programForm.get('topics') as FormArray;
  }

  addTopic(): void {
    this.topicsArray.push(this.fb.control('', Validators.required));
  }

  removeTopic(index: number): void {
    this.topicsArray.removeAt(index);
  }

  onSubmit(): void {
    if (this.programForm.valid) {
      const formValue = this.programForm.value;
      this.programService.addProgram(formValue).subscribe({
        next: (response) => {
          console.log('Program created successfully:', response);
          // Handle success
        },
        error: (error) => {
          console.error('Error creating program:', error);
          // Handle error
        }
      });
    }
  }
}