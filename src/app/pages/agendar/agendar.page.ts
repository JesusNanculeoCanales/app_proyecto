import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-agendar',
  templateUrl: './agendar.page.html',
  styleUrls: ['./agendar.page.scss'],
})
export class AgendarPage implements OnInit {
  agendarForm: FormGroup = this.fb.group({}); // Inicialización para evitar null

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.agendarForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      marcaAuto: ['', Validators.required],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(9), Validators.maxLength(9)]], //validar solo numeros
      matricula: ['', [Validators.required, Validators.pattern('^[A-Za-z0-9\-]*$'), Validators.minLength(6), Validators.maxLength(9)]],
      email: ['', [Validators.required, Validators.email]],
      fecha: ['', [Validators.required]] 
    });
  }

  onSubmit() {
    if (this.agendarForm.valid) {
      console.log('Formulario válido', this.agendarForm.value);
    } else {
      console.log('Formulario no válido');
    }
  }
}
