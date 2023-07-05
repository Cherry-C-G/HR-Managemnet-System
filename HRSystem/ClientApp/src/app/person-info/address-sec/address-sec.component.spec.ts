import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressSecComponent } from './address-sec.component';

describe('AddressSecComponent', () => {
  let component: AddressSecComponent;
  let fixture: ComponentFixture<AddressSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddressSecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddressSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
