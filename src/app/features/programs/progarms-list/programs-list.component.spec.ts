import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgarmsListComponent } from './programs-list.component';

describe('ProgarmsListComponent', () => {
  let component: ProgarmsListComponent;
  let fixture: ComponentFixture<ProgarmsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProgarmsListComponent]
    });
    fixture = TestBed.createComponent(ProgarmsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
