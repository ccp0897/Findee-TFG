import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarEmpleoComponent } from './buscar-empleo.component';

describe('BuscarEmpleoComponent', () => {
  let component: BuscarEmpleoComponent;
  let fixture: ComponentFixture<BuscarEmpleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuscarEmpleoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuscarEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
