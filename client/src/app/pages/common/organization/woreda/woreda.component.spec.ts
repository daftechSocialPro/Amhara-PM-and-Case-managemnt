import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WoredaComponent } from './woreda.component';

describe('WoredaComponent', () => {
  let component: WoredaComponent;
  let fixture: ComponentFixture<WoredaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WoredaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WoredaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
