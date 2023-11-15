import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCaseTypeComponent } from './add-case-type.component';

describe('AddCaseTypeComponent', () => {
  let component: AddCaseTypeComponent;
  let fixture: ComponentFixture<AddCaseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCaseTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCaseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
