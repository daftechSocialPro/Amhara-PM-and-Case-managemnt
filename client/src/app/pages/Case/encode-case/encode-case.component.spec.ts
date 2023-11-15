import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EncodeCaseComponent } from './encode-case.component';

describe('EncodeCaseComponent', () => {
  let component: EncodeCaseComponent;
  let fixture: ComponentFixture<EncodeCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EncodeCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EncodeCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
