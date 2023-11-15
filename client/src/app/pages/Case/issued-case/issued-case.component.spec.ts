import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssuedCaseComponent } from './issued-case.component';

describe('IssuedCaseComponent', () => {
  let component: IssuedCaseComponent;
  let fixture: ComponentFixture<IssuedCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IssuedCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IssuedCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
