import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComittesComponent } from './comittes.component';

describe('ComittesComponent', () => {
  let component: ComittesComponent;
  let fixture: ComponentFixture<ComittesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComittesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComittesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
