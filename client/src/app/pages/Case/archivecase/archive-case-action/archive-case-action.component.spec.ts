import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveCaseActionComponent } from './archive-case-action.component';

describe('ArchiveCaseActionComponent', () => {
  let component: ArchiveCaseActionComponent;
  let fixture: ComponentFixture<ArchiveCaseActionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArchiveCaseActionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArchiveCaseActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
