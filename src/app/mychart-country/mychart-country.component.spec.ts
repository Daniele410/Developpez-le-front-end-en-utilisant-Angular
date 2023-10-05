import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MychartCountryComponent } from './mychart-country.component';

describe('MychartCountryComponent', () => {
  let component: MychartCountryComponent;
  let fixture: ComponentFixture<MychartCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MychartCountryComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(MychartCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
