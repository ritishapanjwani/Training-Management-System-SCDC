import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProgramsListComponent } from './programs-list.component';

describe('ProgarmsListComponent', () => {
  let component: ProgramsListComponent;
  let fixture: ComponentFixture<ProgramsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgramsListComponent]
    });
    fixture = TestBed.createComponent(ProgramsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
