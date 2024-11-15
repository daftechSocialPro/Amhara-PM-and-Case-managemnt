import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateCpmmitteeComponent } from './update-cpmmittee.component';

describe('UpdateCpmmitteeComponent', () => {
  let component: UpdateCpmmitteeComponent;
  let fixture: ComponentFixture<UpdateCpmmitteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateCpmmitteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateCpmmitteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
