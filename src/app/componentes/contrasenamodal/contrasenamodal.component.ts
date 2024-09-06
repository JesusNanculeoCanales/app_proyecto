import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contrasenamodal',
  templateUrl: './contrasenamodal.component.html',
  styleUrls: ['./contrasenamodal.component.scss'],
})
export class ContrasenamodalComponent {
  emailForm: FormGroup;

  constructor(private modalCtrl: ModalController, private fb: FormBuilder) {
    // Inicializa el formulario de recuperación de contraseña
    this.emailForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  cancelar() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirmar() {
    if (this.emailForm.valid) {
      return this.modalCtrl.dismiss(this.emailForm.value, 'confirm');
    } else {
      return this.modalCtrl.dismiss(null, 'cancel');  // Siempre retorna algo
    }
  }

  onSubmit() {
    if (this.emailForm.valid) {
      this.confirmar();
    }
  }
}


