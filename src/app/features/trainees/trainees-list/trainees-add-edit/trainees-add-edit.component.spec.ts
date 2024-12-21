import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TraineesAddEditComponent } from './trainees-add-edit.component';

describe('TraineesAddEditComponent', () => {
  let component: TraineesAddEditComponent;
  let fixture: ComponentFixture<TraineesAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TraineesAddEditComponent]
    });
    fixture = TestBed.createComponent(TraineesAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
