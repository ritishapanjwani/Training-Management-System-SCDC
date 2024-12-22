import { Component, OnInit } from '@angular/core';
import { ProgramService } from 'src/app/core/services/programs.service';
import { TrainerService } from 'src/app/core/services/trainers.service';
import { Program } from 'src/app/core/interfaces/programs.interface';
import { Trainer } from 'src/app/core/interfaces/trainers.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-progarms-list',
  templateUrl: './progarms-list.component.html',
  styleUrls: ['./progarms-list.component.scss']
})
export class ProgarmsListComponent implements OnInit{
   programs: Program[] = [];
  trainers: Trainer[] = [];
  loading = false;
  error: string | null = null;
  showModal = false;
  editingProgram: Program | null = null;
  programForm: FormGroup; 

  constructor(
    private fb: FormBuilder,
    private programService: ProgramService,
    private trainerService: TrainerService
  ) {
    // Initialize the form in constructor
    this.programForm = this.fb.group({
      module: ['', Validators.required],
      topics: this.fb.array([]),
      dayHour: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      time: ['', Validators.required],
      trainingMode: ['Online', Validators.required],
      trainer: ['', Validators.required],
      status: ['Scheduled', Validators.required],
      referenceNotes: ['']
    });
  }

  ngOnInit() {
    this.loadPrograms();
    this.loadTrainers();
  }

  createForm() {
    this.programForm = this.fb.group({
      module: ['', Validators.required],
      topics: this.fb.array([]),
      dayHour: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      time: ['', Validators.required],
      trainingMode: ['Online', Validators.required],
      trainer: ['', Validators.required],
      status: ['Scheduled', Validators.required],
      referenceNotes: ['']
    });
  }

  get topicsFormArray() {
    return this.programForm?.get('topics') as FormArray;
  }

  addTopic() {
    this.topicsFormArray.push(this.fb.control(''));
  }

  removeTopic(index: number) {
    this.topicsFormArray.removeAt(index);
  }

  loadPrograms() {
    this.loading = true;
    this.programService.getAllPrograms().subscribe({
      next: (data) => {
        this.programs = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load programs';
        this.loading = false;
        console.error(err);
      }
    });
  }

  loadTrainers() {
    this.trainerService.getAllTrainers().subscribe({
      next: (data) => {
        this.trainers = data;
      },
      error: (err) => console.error('Error loading trainers:', err)
    });
  }

  getTrainerName(trainerId: string | Trainer | undefined): string {
    if (!trainerId) return 'Unknown';
    
    if (typeof trainerId === 'string') {
      const trainer = this.trainers.find(t => t._id === trainerId);
      return trainer ? trainer.Trainername : 'Unknown';
    }
    return trainerId.Trainername;
  }

  getStatusClass(status: string): string {
    const baseClasses = 'px-2 py-1 rounded text-sm';
    switch (status) {
      case 'Scheduled':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      case 'Ongoing':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'Completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return baseClasses;
    }
  }

  openCreateForm() {
    this.editingProgram = null;
    this.createForm();
    this.showModal = true;
  }

  editProgram(program: Program) {
    this.editingProgram = program;
    this.programForm?.patchValue({
      module: program.module,
      dayHour: program.dayHour,
      startDate: new Date(program.startDate).toISOString().split('T')[0],
      endDate: new Date(program.endDate).toISOString().split('T')[0],
      time: program.time,
      trainingMode: program.trainingMode,
      trainer: typeof program.trainer === 'string' ? program.trainer : program.trainer._id,
      status: program.status,
      referenceNotes: program.referenceNotes
    });
    
    // Clear and rebuild topics
    while (this.topicsFormArray.length) {
      this.topicsFormArray.removeAt(0);
    }
    program.topics.forEach(topic => {
      this.topicsFormArray.push(this.fb.control(topic));
    });
    
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
    this.editingProgram = null;
    this.createForm();
  }

  onSubmit() {
    if (this.programForm?.valid) {
      const programData = this.programForm.value;
      
      if (this.editingProgram) {
        this.programService.updateProgram(this.editingProgram._id!, programData).subscribe({
          next: () => {
            this.loadPrograms();
            this.closeModal();
          },
          error: (err) => {
            this.error = 'Failed to update program';
            console.error(err);
          }
        });
      } else {
        this.programService.createProgram(programData).subscribe({
          next: () => {
            this.loadPrograms();
            this.closeModal();
          },
          error: (err) => {
            this.error = 'Failed to create program';
            console.error(err);
          }
        });
      }
    }
  }

  deleteProgram(id: string | undefined) {
    if (!id) {
      console.error('No program ID provided');
      return;
    }

    if (confirm('Are you sure you want to delete this program?')) {
      this.programService.deleteProgram(id).subscribe({
        next: () => {
          this.programs = this.programs.filter(p => p._id !== id);
        },
        error: (err) => {
          this.error = 'Failed to delete program';
          console.error(err);
        }
      });
    }
  }
}

