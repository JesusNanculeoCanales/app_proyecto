import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AgregarMecanicoPage } from './agregar-mecanico.page';

describe('AgregarMecanicoPage', () => {
  let component: AgregarMecanicoPage;
  let fixture: ComponentFixture<AgregarMecanicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AgregarMecanicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
