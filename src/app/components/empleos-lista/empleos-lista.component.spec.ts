import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleosListaComponent } from './empleos-lista.component';

describe('EmpleosListaComponent', () => {
  let component: EmpleosListaComponent;
  let fixture: ComponentFixture<EmpleosListaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleosListaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleosListaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
