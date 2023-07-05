import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NameSecComponent } from './name-sec.component';

describe('NameSecComponent', () => {
  let component: NameSecComponent;
  let fixture: ComponentFixture<NameSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NameSecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NameSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
