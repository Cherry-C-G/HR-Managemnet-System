import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmergencySecComponent } from './emergency-sec.component';

describe('EmergencySecComponent', () => {
  let component: EmergencySecComponent;
  let fixture: ComponentFixture<EmergencySecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmergencySecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmergencySecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
