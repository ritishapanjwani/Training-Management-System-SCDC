import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainersAddEditComponent } from './trainers-add-edit.component';

describe('TrainersAddEditComponent', () => {
  let component: TrainersAddEditComponent;
  let fixture: ComponentFixture<TrainersAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TrainersAddEditComponent]
    });
    fixture = TestBed.createComponent(TrainersAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
