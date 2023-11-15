import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFileSettingComponent } from './add-file-setting.component';

describe('AddFileSettingComponent', () => {
  let component: AddFileSettingComponent;
  let fixture: ComponentFixture<AddFileSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFileSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFileSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
