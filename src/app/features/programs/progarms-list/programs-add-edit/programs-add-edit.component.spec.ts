import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramsAddEditComponent } from './programs-add-edit.component';

describe('ProgramsAddEditComponent', () => {
  let component: ProgramsAddEditComponent;
  let fixture: ComponentFixture<ProgramsAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramsAddEditComponent]
    });
    fixture = TestBed.createComponent(ProgramsAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
