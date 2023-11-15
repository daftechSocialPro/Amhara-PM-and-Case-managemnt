import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteCaseComponent } from './complete-case.component';

describe('CompleteCaseComponent', () => {
  let component: CompleteCaseComponent;
  let fixture: ComponentFixture<CompleteCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
