import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CtaEmpleoComponent } from './cta-empleo.component';

describe('CtaEmpleoComponent', () => {
  let component: CtaEmpleoComponent;
  let fixture: ComponentFixture<CtaEmpleoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CtaEmpleoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CtaEmpleoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
