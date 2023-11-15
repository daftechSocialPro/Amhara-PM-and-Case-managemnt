import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComiteeComponent } from './add-comitee.component';

describe('AddComiteeComponent', () => {
  let component: AddComiteeComponent;
  let fixture: ComponentFixture<AddComiteeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddComiteeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddComiteeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
