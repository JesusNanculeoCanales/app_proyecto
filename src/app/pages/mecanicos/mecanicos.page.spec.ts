import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MecanicosPage } from './mecanicos.page';

describe('MecanicosPage', () => {
  let component: MecanicosPage;
  let fixture: ComponentFixture<MecanicosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MecanicosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
