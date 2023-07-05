import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardingInsertFormComponent } from './on-boarding-insert-form.component';

describe('OnBoardingInsertFormComponent', () => {
  let component: OnBoardingInsertFormComponent;
  let fixture: ComponentFixture<OnBoardingInsertFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OnBoardingInsertFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OnBoardingInsertFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
