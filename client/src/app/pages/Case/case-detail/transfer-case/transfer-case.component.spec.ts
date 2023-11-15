import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferCaseComponent } from './transfer-case.component';

describe('TransferCaseComponent', () => {
  let component: TransferCaseComponent;
  let fixture: ComponentFixture<TransferCaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransferCaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransferCaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
