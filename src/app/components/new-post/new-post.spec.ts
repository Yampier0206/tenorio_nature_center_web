import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPost } from './new-post';

describe('NewPost', () => {
  let component: NewPost;
  let fixture: ComponentFixture<NewPost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewPost],
    }).compileComponents();

    fixture = TestBed.createComponent(NewPost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
