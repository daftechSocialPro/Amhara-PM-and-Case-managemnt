import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaseChildComponent } from './add-case-child.component';

describe('AddCaseChildComponent', () => {
  let component: AddCaseChildComponent;
  let fixture: ComponentFixture<AddCaseChildComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCaseChildComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCaseChildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
