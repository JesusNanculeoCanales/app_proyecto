import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImprimirPage } from './imprimir.page';

describe('ImprimirPage', () => {
  let component: ImprimirPage;
  let fixture: ComponentFixture<ImprimirPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ImprimirPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
