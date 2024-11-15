import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramByDetailsComponent } from './program-by-details.component';

describe('ProgramByDetailsComponent', () => {
  let component: ProgramByDetailsComponent;
  let fixture: ComponentFixture<ProgramByDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgramByDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgramByDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
