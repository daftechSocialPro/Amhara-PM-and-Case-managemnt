import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSmsTemplateComponent } from './add-sms-template.component';

describe('AddSmsTemplateComponent', () => {
  let component: AddSmsTemplateComponent;
  let fixture: ComponentFixture<AddSmsTemplateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSmsTemplateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSmsTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
