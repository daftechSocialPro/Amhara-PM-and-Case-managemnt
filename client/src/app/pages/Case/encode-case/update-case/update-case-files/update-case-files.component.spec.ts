import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCaseFilesComponent } from './update-case-files.component';

describe('UpdateCaseFilesComponent', () => {
  let component: UpdateCaseFilesComponent;
  let fixture: ComponentFixture<UpdateCaseFilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCaseFilesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCaseFilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
