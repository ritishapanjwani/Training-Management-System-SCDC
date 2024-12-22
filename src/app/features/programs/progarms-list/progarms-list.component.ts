import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/core/services/programs.service';
import { TrainerService } from 'src/app/core/services/trainers.service';
import { Trainer } from 'src/app/core/interfaces/trainers.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ProgramsAddEditComponent } from './programs-add-edit/programs-add-edit.component';



@Component({
  selector: 'app-progarms-list',
  templateUrl: './progarms-list.component.html',
  styleUrls: ['./progarms-list.component.scss']
})
export class ProgarmsListComponent implements OnInit{
  programForm: FormGroup;
  trainers: Trainer[] = []; // List of trainers (populate from API)

  constructor(private fb: FormBuilder, private programService: ProgramService, private trainerService:TrainerService, private dialog:MatDialog) {
    this.programForm = this.fb.group({
      module: ['', Validators.required],
      topics: this.fb.array([], Validators.required), // Dynamic array for topics
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

  // Get the topics FormArray
  get topics(): FormArray {
    return this.programForm.get('topics') as FormArray;
  }

  // Add a new topic field
  addTopic(): void {
    this.topics.push(this.fb.control(''));
  }

  // Remove a topic field
  removeTopic(index: number): void {
    this.topics.removeAt(index);
  }

  loadTrainers(): void {
    this.trainerService.getAllTrainers().subscribe(
      (data) => {
        this.trainers = data;
        console.log('Trainers loaded successfully', this.trainers);
      },
      (error) => {
        console.error('Error loading trainers', error);
      }
    );
  }


  openAddEditForm() {
    this.dialog.open(ProgramsAddEditComponent);
  }
}

