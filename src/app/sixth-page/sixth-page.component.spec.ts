import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SixthPageComponent } from './sixth-page.component';

describe('SixthPageComponent', () => {
  let component: SixthPageComponent;
  let fixture: ComponentFixture<SixthPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SixthPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SixthPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
