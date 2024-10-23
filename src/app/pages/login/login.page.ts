import { Component, OnInit } from '@angular/core';
import { BasededatosService } from 'src/app/services/basededatos.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private db: BasededatosService) {this.db.presentAlert("BD Creada"); }

  ngOnInit() {
  }

}
