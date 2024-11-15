import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseTypeComponent } from './case-type.component';

describe('CaseTypeComponent', () => {
  let component: CaseTypeComponent;
  let fixture: ComponentFixture<CaseTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
