import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowonmapComponent } from './showonmap.component';

describe('ShowonmapComponent', () => {
  let component: ShowonmapComponent;
  let fixture: ComponentFixture<ShowonmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowonmapComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowonmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
