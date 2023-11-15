import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShelfComponent } from './add-shelf.component';

describe('AddShelfComponent', () => {
  let component: AddShelfComponent;
  let fixture: ComponentFixture<AddShelfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddShelfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddShelfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
