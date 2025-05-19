import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleoDetallePopUpComponent } from './empleo-detalle-pop-up.component';

describe('EmpleoDetallePopUpComponent', () => {
  let component: EmpleoDetallePopUpComponent;
  let fixture: ComponentFixture<EmpleoDetallePopUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleoDetallePopUpComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleoDetallePopUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
