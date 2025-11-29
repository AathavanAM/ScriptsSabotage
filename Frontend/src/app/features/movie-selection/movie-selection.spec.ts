import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSelection } from './movie-selection';

describe('MovieSelection', () => {
  let component: MovieSelection;
  let fixture: ComponentFixture<MovieSelection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieSelection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieSelection);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
