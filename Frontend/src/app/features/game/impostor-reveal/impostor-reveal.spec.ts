import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImpostorReveal } from './impostor-reveal';

describe('ImpostorReveal', () => {
  let component: ImpostorReveal;
  let fixture: ComponentFixture<ImpostorReveal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImpostorReveal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImpostorReveal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
