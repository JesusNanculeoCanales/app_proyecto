import { Component } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage {
  capturedImage: string | null = null;
  isLoading: boolean = false;

  constructor(private toastController: ToastController) {}

  async takePicture() {
    this.isLoading = true;

    try {
      const image = await Camera.getPhoto({
        quality: 100,
        resultType: CameraResultType.DataUrl,
        source: CameraSource.Camera,  // Usamos la cámara
      });

      this.capturedImage = image.dataUrl || null;
      this.showToast('Imagen capturada con éxito');
    } catch (error) {
      console.error('Error capturing image', error);
      this.showToast('Error al capturar la imagen');
    } finally {
      this.isLoading = false;
    }
  }

  // Función para mostrar los mensajes de toast
  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
