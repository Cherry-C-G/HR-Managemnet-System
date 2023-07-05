import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommentHRComponent } from './comment-hr.component';

describe('CommentHRComponent', () => {
  let component: CommentHRComponent;
  let fixture: ComponentFixture<CommentHRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommentHRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommentHRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
