import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyCaseListComponent } from './my-case-list.component';

describe('MyCaseListComponent', () => {
  let component: MyCaseListComponent;
  let fixture: ComponentFixture<MyCaseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyCaseListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyCaseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
