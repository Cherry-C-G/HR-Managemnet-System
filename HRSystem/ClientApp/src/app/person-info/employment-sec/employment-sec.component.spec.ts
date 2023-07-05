import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmploymentSecComponent } from './employment-sec.component';

describe('EmploymentSecComponent', () => {
  let component: EmploymentSecComponent;
  let fixture: ComponentFixture<EmploymentSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmploymentSecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmploymentSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
