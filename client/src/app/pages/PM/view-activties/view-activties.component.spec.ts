import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewActivtiesComponent } from './view-activties.component';

describe('ViewActivtiesComponent', () => {
  let component: ViewActivtiesComponent;
  let fixture: ComponentFixture<ViewActivtiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewActivtiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewActivtiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
