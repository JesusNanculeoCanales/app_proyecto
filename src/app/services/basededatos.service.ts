import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Usuario } from '../tablas/usuario';
import { Rol } from '../tablas/rol';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BasededatosService {

  constructor(private platform: Platform, private sqlite: SQLite, private alertController: AlertController) { 
    this.crearBD();
  }

  public database!: SQLiteObject;

  // Crear tabla de roles
  tablaRol: string = "CREATE TABLE IF NOT EXISTS rol(idrol INTEGER PRIMARY KEY AUTOINCREMENT, nombre VARCHAR(20) NOT NULL);";
  
  registroRol1: string = "INSERT OR IGNORE INTO rol(idrol, nombre) VALUES(1, 'Administrador');";
  registroRol2: string = "INSERT OR IGNORE INTO rol(idrol, nombre) VALUES(2, 'Mecanico');";

  listaRol = new BehaviorSubject([]);

  // Crear tabla de usuarios
  tablaUsuario: string = `CREATE TABLE IF NOT EXISTS usuarios(
    id_usu INTEGER PRIMARY KEY AUTOINCREMENT,  
    nombre VARCHAR(30) NOT NULL,
    correo VARCHAR(100) NOT NULL, 
    clave VARCHAR(20) NOT NULL,
    rol_idrol INTEGER NOT NULL, 
    FOREIGN KEY (rol_idrol) REFERENCES rol(idrol)
  );`;

  registroUsuario1: string = `INSERT OR IGNORE INTO usuarios(
    id_usu,
    nombre,
    correo,
    clave, 
    rol_idrol
  ) VALUES (
    1,
    'John', 
    'johncena@gmail.com',
    'Clave.1234', 
    '2'
  );`;

  listaUsuario = new BehaviorSubject([]);

  // Observable para manipular el estado de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  dbState() {
    return this.isDBReady.asObservable();
  }

  // Roles
  fetchRoles(): Observable<Rol[]> {
    return this.listaRol.asObservable();
  }

  buscarRoles() {
    return this.database.executeSql('SELECT * FROM rol', []).then(res => {
      let items: Rol[] = [];

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            idrol: res.rows.item(i).idrol,
            nombre: res.rows.item(i).nombre
          });
        }
      }

      this.listaRol.next(items as any);

    }).catch(e => {
      this.presentAlert('Error de buscar Roles: ' + e.message);
    });
  }

  // Usuario
  fetchUsuario(): Observable<Usuario[]> {
    return this.listaUsuario.asObservable();
  }

  buscarUsuarios() {
    return this.database.executeSql('SELECT * FROM usuarios', []).then(res => {
      let items: Usuario[] = [];

      if (res.rows.length > 0) {
        for (var i = 0; i < res.rows.length; i++) {
          items.push({
            id_usu: res.rows.item(i).id_usu,
            nombre: res.rows.item(i).nombre,
            correo: res.rows.item(i).correo,
            clave: res.rows.item(i).clave,
            rol_idrol: res.rows.item(i).rol_idrol
          });
        }
      }

      this.listaUsuario.next(items as any);

    }).catch(e => {
      this.presentAlert('Error de buscar Usuarios: ' + e.message);
    });
  }

  async buscarUsuariosUnicoLogin(correoUsu: string, claveUsu: string) {
    try {
      const res = await this.database.executeSql('SELECT * from usuarios WHERE correo = ? AND clave = ?;', [correoUsu, claveUsu]);
      let usuario: Usuario | null = null;

      if (res.rows.length > 0) {
        usuario = {
          id_usu: res.rows.item(0).id_usu,
          nombre: res.rows.item(0).nombre,
          correo: res.rows.item(0).correo,
          clave: res.rows.item(0).clave,
          rol_idrol: res.rows.item(0).rol_idrol
        };
      }

      return usuario;
    } catch (e: any) {
      this.presentAlert('Error de buscar Usuario Unico: ' + e.message);
      return null;
    }
  }

  // Registrar nuevo usuario
  async registrarUsuario(usuario: any): Promise<boolean> {
    try {
      const res = await this.database.executeSql('SELECT * FROM usuarios WHERE correo = ?;', [usuario.correo]);

      if (res.rows.length > 0) {
        this.presentAlert('El correo ya está registrado.');
        return false;
      } else {
        await this.database.executeSql(`INSERT INTO usuarios (nombre, correo, clave, rol_idrol) VALUES (?, ?, ?, ?);`, 
        [usuario.nombre, usuario.correo, usuario.clave, usuario.rol_idrol]);

        this.presentAlert('Usuario registrado correctamente.');
        this.buscarUsuarios();  // Actualiza la lista de usuarios
        return true;
      }
    } catch (e: any) {
      this.presentAlert('Error al registrar usuario: ' + e.message);
      return false;
    }
  }

  crearBD() {
    this.platform.ready().then(() => {
      this.sqlite.create({
        name: 'dbnoticias.db',
        location: 'default'
      }).then((db: SQLiteObject) => {
        this.database = db;
        this.crearTablas();
      }).catch(e => {
        this.presentAlert("Error de crear BD: " + e.message);
      });
    });
  }

  async crearTablas() {
    try {
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);

      await this.database.executeSql(this.registroRol1, []);
      await this.database.executeSql(this.registroRol2, []);
      await this.database.executeSql(this.registroUsuario1, []);

      this.isDBReady.next(true);
      this.buscarRoles();
      this.buscarUsuarios();
    } catch (e: any) {
      this.presentAlert('Error de crear Tablas: ' + e.message);
    }
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}