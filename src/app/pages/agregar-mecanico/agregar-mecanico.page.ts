import { Component } from '@angular/core';
import { Router } from '@angular/router';  
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-agregar-mecanico',
  templateUrl: './agregar-mecanico.page.html',
  styleUrls: ['./agregar-mecanico.page.scss'],
})
export class AgregarMecanicoPage {

  mecanico = {
    id: '',
    nombre: '',
    imagen: '',  
    especialidad: '',
    localidad: '',
    mail: '',
    contacto: 0
  };

  constructor(
    private router: Router,
    private db: BasededatosService
  ) {}

  // Método para crear un nuevo mecánico
  async crearMecanico() {
    try {

      await this.db.anadirMecanico(
        this.mecanico.nombre,
        this.imagenURL,
        this.mecanico.especialidad,
        this.mecanico.localidad,
        this.mecanico.mail,
        this.mecanico.contacto
      );

      this.router.navigate(['/list-mecanicos']);
      this.db.presentAlertExito('Mecánico agregado: ' + this.mecanico.nombre);

    } catch (e:any) {
      this.db.presentAlert('Error al agregar el mecánico: ' + e.message);
    }
  }

  // Función para convertir la imagen a Blob
  async loadImageAsBlob(imagePath: string): Promise<Blob> {
    const response = await fetch(imagePath);
    const imageBlob = await response.blob();
    return imageBlob;
  }

  imagenURL?: string | ArrayBuffer | null;

  takePicture = async () => {
    const image2 = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

    this.imagenURL = image2.dataUrl;
  };
}
