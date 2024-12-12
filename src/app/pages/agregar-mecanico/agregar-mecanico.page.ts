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
    nombre: '',
    especialidad: '',
    localidad: '',
    mail: '',
    contacto: 0,
  };

  imagenURL?: string | ArrayBuffer | null;
  errores: { [key: string]: string } = {};

  constructor(
    private router: Router,
    private db: BasededatosService
  ) {}

  async crearMecanico() {
    // Limpiar errores
    this.errores = {};

    // Validaciones
    if (!this.mecanico.nombre.trim()) {
      this.errores['nombre'] = 'El nombre del mecánico es obligatorio.';
    }
    if (!this.mecanico.especialidad.trim()) {
      this.errores['especialidad'] = 'La especialidad es obligatoria.';
    }
    if (!this.mecanico.localidad.trim()) {
      this.errores['localidad'] = 'La localidad es obligatoria.';
    }
    if (!this.mecanico.mail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.mecanico.mail)) {
      this.errores['mail'] = 'El correo es obligatorio y debe ser válido.';
    }
    if (!this.mecanico.contacto || !/^\d{9}$/.test(this.mecanico.contacto.toString())) {
      this.errores['contacto'] = 'El contacto es obligatorio y debe tener 9 dígitos.';
    }

    // Si hay errores, no continuar
    if (Object.keys(this.errores).length > 0) {
      return;
    }

    try {
      await this.db.anadirMecanico(
        this.mecanico.nombre,
        this.imagenURL || '',
        this.mecanico.especialidad,
        this.mecanico.localidad,
        this.mecanico.mail,
        this.mecanico.contacto
      );

      // Redirigir directamente después de agregar el mecánico
      this.router.navigate(['/mecanicos']);
      this.db.presentAlertExito('Mecánico agregado: ' + this.mecanico.nombre);
    } catch (e: any) {
      this.db.presentAlert('Error al agregar el mecánico: ' + e.message);
    }
  }

  // Tomar foto (opcional)
  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    });

    this.imagenURL = image.dataUrl;
  }
}
