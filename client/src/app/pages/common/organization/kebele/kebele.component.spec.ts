import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KebeleComponent } from './kebele.component';

describe('KebeleComponent', () => {
  let component: KebeleComponent;
  let fixture: ComponentFixture<KebeleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KebeleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KebeleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
