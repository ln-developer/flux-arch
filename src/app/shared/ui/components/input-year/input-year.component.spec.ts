import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputYearComponent } from './input-year.component';

describe('InputYearComponent', () => {
  let component: InputYearComponent;
  let fixture: ComponentFixture<InputYearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputYearComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputYearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
