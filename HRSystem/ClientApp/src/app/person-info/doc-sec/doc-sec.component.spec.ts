import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocSecComponent } from './doc-sec.component';

describe('DocSecComponent', () => {
  let component: DocSecComponent;
  let fixture: ComponentFixture<DocSecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DocSecComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocSecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
