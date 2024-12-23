import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/core/services/programs.service';
import { TrainerService } from 'src/app/core/services/trainers.service';
import { Trainer } from 'src/app/core/interfaces/trainers.interface';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { __values } from 'tslib';
import {COMMA, ENTER} from '@angular/cdk/keycodes'
import { MatChipInputEvent } from '@angular/material/chips';



@Component({
  selector: 'app-programs-add-edit',
  templateUrl: './programs-add-edit.component.html',
  styleUrls: ['./programs-add-edit.component.scss']
})
export class ProgramsAddEditComponent implements OnInit {
  programForm: FormGroup<any>;
  trainerNames: string[] = [];  
  trainingModes:string[] = ['Online', 'Offline'];
  trainingStatus: string[] = ['Scheduled', 'Completed', 'Cancelled'];
  selectedStatus: string = 'Scheduled';
  topics:string[]  = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  topicsControl = new FormControl([]);



  constructor(
    private fb: FormBuilder,
    private programService: ProgramService,
    private trainerService: TrainerService,
    private dialog: MatDialog,
  ) {
    // Initialize form in constructor
    this.programForm = this.fb.group({
      module: ['', Validators.required],
      topics: this.fb.array([], Validators.required),
      dayHour: [0, [Validators.required, Validators.min(1)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      trainingMode: ['Online', Validators.required],
      trainer: ['', Validators.required],
      status: ['Scheduled', Validators.required],
      referenceNotes: [''],
    });
  }

  ngOnInit(): void {
    this.loadTrainerNames();
  }

  private loadTrainerNames() {
    this.trainerService.getTrainerNames().subscribe({
      next: (names) => {
        this.trainerNames = names;
        console.log(this.trainerNames);
      },
      error: (error) => {
        console.error('Error loading trainer names:', error);
      }
    });
  }
 
  onFormSubmit() {
    this.programForm.markAllAsTouched(); // Mark all fields as touched to trigger validation
  
    if (this.programForm.valid) {
      console.log(this.programForm.value);
      // Handle form submission
    } else {
      console.log("Form is invalid");
      const topicsArray = this.programForm.get('topics') as FormArray;
      if (topicsArray.errors) {
        console.log('Topics errors:', topicsArray.errors);
      }
      // Log all form errors
      Object.keys(this.programForm.controls).forEach(key => {
        const control = this.programForm.get(key);
        if (control?.errors) {
          console.log(`${key} errors:`, control.errors);
        }
      });
    }
  }
 

 
 


   addTopic(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
  
    if (value) {
      const topicsArray = this.programForm.get('topics') as FormArray;
      if (!topicsArray.value.includes(value)) { // Prevent duplicates
        topicsArray.push(new FormControl(value));
        this.programForm.updateValueAndValidity(); // Force validation update
      }
    }
  
    event.chipInput!.clear();
  }

  removeTopic(topic: string): void {
    const topicsArray = this.programForm.get('topics') as FormArray;
    const index = topicsArray.controls.findIndex(control => control.value === topic);
  
    if (index >= 0) {
      topicsArray.removeAt(index);
      this.programForm.updateValueAndValidity(); // Force validation update
    }
  }


  editTopic(topic: string, event: any): void {
    const value = event.value.trim();
    const index = this.topics.indexOf(topic);

    if (index >= 0) {
      if (value) {
        this.topics[index] = value;
      } else {
        this.topics.splice(index, 1);
      }
      this.programForm.patchValue({
        topics: this.topics
      });
    }
  }

  isTopicsInvalid(): boolean {
    const topicsArray = this.programForm.get('topics') as FormArray;
    return topicsArray.invalid && (topicsArray.dirty || topicsArray.touched);
  }

 
get topicsArray(): FormArray {
  return this.programForm.get('topics') as FormArray;
}

  // Method to set topics array
  setTopics(topics: string[]): void {
    this.topics = [...topics];
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
