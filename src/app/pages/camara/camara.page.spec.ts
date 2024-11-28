import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CamaraPage } from './camara.page';
import { ToastController } from '@ionic/angular';

describe('CamaraPage', () => {
  let component: CamaraPage;
  let fixture: ComponentFixture<CamaraPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CamaraPage],
      providers: [ToastController],  // Añadir ToastController
    }).compileComponents();

    fixture = TestBed.createComponent(CamaraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a toast message on success', async () => {
    const toastControllerSpy = spyOn(component['toastController'], 'create').and.callThrough();
    await component.showToast('Imagen capturada con éxito');
    expect(toastControllerSpy).toHaveBeenCalled();
  });
});
