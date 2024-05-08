import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputAddressComponent } from './input-address.component';

describe('InputAddressComponent', () => {
  let component: InputAddressComponent;
  let fixture: ComponentFixture<InputAddressComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputAddressComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputAddressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
