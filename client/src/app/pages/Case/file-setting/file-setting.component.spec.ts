import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileSettingComponent } from './file-setting.component';

describe('FileSettingComponent', () => {
  let component: FileSettingComponent;
  let fixture: ComponentFixture<FileSettingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileSettingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
