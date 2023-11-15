import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivecaseComponent } from './archivecase.component';

describe('ArchivecaseComponent', () => {
  let component: ArchivecaseComponent;
  let fixture: ComponentFixture<ArchivecaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchivecaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchivecaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
