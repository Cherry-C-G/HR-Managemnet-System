import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HRVisaStatusManagementComponent } from './hrvisa-status-management.component';

describe('HRVisaStatusManagementComponent', () => {
  let component: HRVisaStatusManagementComponent;
  let fixture: ComponentFixture<HRVisaStatusManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HRVisaStatusManagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HRVisaStatusManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
