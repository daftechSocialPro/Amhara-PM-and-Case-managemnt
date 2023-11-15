import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCasesComponent } from './search-cases.component';

describe('SearchCasesComponent', () => {
  let component: SearchCasesComponent;
  let fixture: ComponentFixture<SearchCasesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchCasesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchCasesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
