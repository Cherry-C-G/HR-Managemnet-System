import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HREmployeeProfileComponent } from './hremployee-profile.component';

describe('HREmployeeProfileComponent', () => {
  let component: HREmployeeProfileComponent;
  let fixture: ComponentFixture<HREmployeeProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HREmployeeProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HREmployeeProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
