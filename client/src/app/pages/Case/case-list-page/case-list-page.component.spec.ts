import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaseListPageComponent } from './case-list-page.component';

describe('CaseListPageComponent', () => {
  let component: CaseListPageComponent;
  let fixture: ComponentFixture<CaseListPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaseListPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaseListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
