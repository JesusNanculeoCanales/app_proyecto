import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { Usuario } from '../tablas/usuario';
import { Rol } from '../tablas/rol';
import { AlertController, Platform } from '@ionic/angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { Pieza } from '../tablas/pieza';

@Injectable({
  providedIn: 'root'
})
export class BasededatosService {


  //DROPS DE PRUEBA
  dropRol: string = 'DROP TABLE rol;'
  dropUsuarios: string = 'DROP TABLE usuarios;'
  dropPiezas: string = 'DROP TABLE piezas;'

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

  registroUsuario2: string = `INSERT OR IGNORE INTO usuarios(
    id_usu,
    nombre,
    correo,
    clave, 
    rol_idrol
  ) VALUES (
    2,
    'admin', 
    'admin@gmail.com',
    'Clave.1234', 
    '1'
  );`;

  listaUsuario = new BehaviorSubject([]);



  //Crear tabla de piezas
  tablaPieza: string =`CREATE TABLE IF NOT EXISTS piezas(
    id_pieza INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre VARCHAR(30) NOT NULL,
    descripcion VARCHAR(100) NOT NULL,
    cantidad INTEGER NOT NULL,
    precio INTEGER NOT NULL,
    fecha_adquisicion DATE NOT NULL,
    usuario_idusu INTEGER NOT NULL,
    FOREIGN KEY (usuario_idusu) REFERENCES usuarios(id_usu)
  )`;

  registroPieza1: string = `INSERT OR IGNORE INTO piezas(
  id_pieza,
  nombre,
  descripcion,
  cantidad,
  precio,
  fecha_adquisicion,
  usuario_idusu
  ) VALUES (
   1,
   'FRENOS TOYOTA',
   'prueba de descripcion',
   13,
   15000,
   '2024-10-21',
   '1'
   );`;

  registroPieza2: string = `INSERT OR IGNORE INTO piezas(
    id_pieza,
    nombre,
    descripcion,
    cantidad,
    precio,
    fecha_adquisicion,
    usuario_idusu
    ) VALUES (
     2,
     'MANUBRIO CHEVROLET',
     'prueba de descripcion2',
     18,
     20000,
     '2024-10-22',
     '1'
     );`;


  
  listaPiezas = new BehaviorSubject([]);





















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

  // Buscar y validar el login del usuario, luego almacenar el nombre en localStorage
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

        // Almacenar el nombre del usuario en localStorage
        localStorage.setItem('id_usu', usuario.id_usu);
        localStorage.setItem('nombreUsuario', usuario.nombre);
      }

      return usuario;
    } catch (e: any) {
      this.presentAlert('Error de buscar Usuario Unico: ' + e.message);
      return null;
    }
  }

  // Obtener el usuario logueado desde localStorage
  async obtenerUsuarioLogueado(): Promise<string | null> {
    try {
      const nombre = localStorage.getItem('nombreUsuario');
      return nombre ? nombre : null;
    } catch (e: any) {
      this.presentAlert('Error obteniendo el usuario logueado: ' + e.message);
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






// Piezas
fetchPiezas(): Observable<Pieza[]> {
  return this.listaPiezas.asObservable();
}

buscarPiezas() {
  return this.database.executeSql('SELECT * FROM piezas', []).then(res => {
    let items: Pieza[] = [];

    if (res.rows.length > 0) {
      for (var i = 0; i < res.rows.length; i++) {
        items.push({
          id_pieza: res.rows.item(i).id_pieza,
          nombre: res.rows.item(i).nombre,
          descripcion: res.rows.item(i).descripcion,
          cantidad: res.rows.item(i).cantidad,
          precio: res.rows.item(i).precio,
          fecha_adquisicion: res.rows.item(i).fecha_adquisicion,
          usuario_idusu: res.rows.item(i).usuario_idusu
        });
      }
    }

    this.listaPiezas.next(items as any);

  }).catch(e => {
    this.presentAlert('Error de buscar Piezas: ' + e.message);
  });
}

async anadirPieza(nombre: string, descripcion: string, cantidad: number, precio: number, fecha_adquisicion: Date, usuario_idusu: number){
  try {
    const res = await this.database.executeSql('INSERT INTO piezas(nombre, descripcion,cantidad,precio,fecha_adquisicion,usuario_idusu) VALUES (?,?,?,?,?,?);', [nombre, descripcion,cantidad,precio,fecha_adquisicion,usuario_idusu]);
    // Obtener la ID del usuario recién insertado
    const id_pieza = res.insertId;

    // Llamar a buscarUsuarios() u otra lógica si es necesario
    await this.buscarPiezas();

    // Devolver la ID del usuario recién insertado
    return id_pieza;
  }
  catch (e: any) {
    this.presentAlert('Error de insertar Piezas: ' + e.message);
  }

}


borrarPiezas(id_pieza: any) {
  return this.database.executeSql('DELETE FROM piezas WHERE id_pieza = ?;', [id_pieza]).then(res => {
    this.buscarPiezas();
  }).catch(e => {
    this.presentAlert('Error de borrar Piezas: ' + e.message);
  })
}

// Buscar una pieza por su ID
async buscarPiezaPorId(id_pieza: number): Promise<any> {
  try {
    const res = await this.database.executeSql('SELECT * FROM piezas WHERE id_pieza = ?', [id_pieza]);
    if (res.rows.length > 0) {
      return res.rows.item(0);  // Retornar la pieza encontrada
    }
    return null;  // Si no se encuentra la pieza
  } catch (e: any) {
    this.presentAlert('Error al buscar la pieza: ' + e.message);
    return null;
  }
}

// Método para actualizar una pieza
async actualizarPieza(id_pieza: number, nombre: string, descripcion: string, cantidad: number, precio: number, usuario_idusu: number): Promise<void> {
  try {
    await this.database.executeSql(
      'UPDATE piezas SET nombre = ?, descripcion = ?, cantidad = ?, precio = ?, usuario_idusu = ? WHERE id_pieza = ?;',
      [nombre, descripcion, cantidad, precio, usuario_idusu, id_pieza]
    );
  } catch (e: any) {
    this.presentAlert('Error al actualizar la pieza: ' + e.message);
    throw e;  // Lanza el error para que sea capturado en la página
  }
}






























// Buscar el correo en la base de datos SQLite1
async buscarUsuarioPorCorreo(correo: string): Promise<Usuario | null> {
  try {
    const res = await this.database.executeSql('SELECT * FROM usuarios WHERE correo = ?;', [correo]);
    if (res.rows.length > 0) {
      return {
        id_usu: res.rows.item(0).id_usu,
        nombre: res.rows.item(0).nombre,
        correo: res.rows.item(0).correo,
        clave: res.rows.item(0).clave,
        rol_idrol: res.rows.item(0).rol_idrol
      };
    } else {
      return null; // No encontrado
    }
  } catch (e: any) {
    this.presentAlert('Error de buscar Usuario por correo: ' + e.message);
    return null;
  }
}

// Actualizar la clave del usuario en la base de datos
async actualizarClaveUsuario(correo: string, nuevaClave: string): Promise<void> {
  try {
    await this.database.executeSql('UPDATE usuarios SET clave = ? WHERE correo = ?;', [nuevaClave, correo]);
  } catch (e: any) {
    this.presentAlert('Error al actualizar la contraseña: ' + e.message);
  }
}



























  //BASE DE DATOS

  // Observable para manipular el estado de la BD
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  dbState() {
    return this.isDBReady.asObservable();
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

      //CREACION DE TABLAS
      await this.database.executeSql(this.tablaRol, []);
      await this.database.executeSql(this.tablaUsuario, []);
      await this.database.executeSql(this.tablaPieza, []);

      //INSERT DE REGISTROS
      await this.database.executeSql(this.registroRol1, []);
      await this.database.executeSql(this.registroRol2, []);
      
      await this.database.executeSql(this.registroUsuario1, []);
      await this.database.executeSql(this.registroUsuario2, []);

      await this.database.executeSql(this.registroPieza1, []);
      await this.database.executeSql(this.registroPieza2, []);

      this.isDBReady.next(true);
      this.buscarRoles();
      this.buscarUsuarios();
      this.buscarPiezas();
    } catch (e: any) {
      this.presentAlert('Error de crear Tablas: ' + e.message);
    }
  }












  //FUNCIONES EXTRA
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  
  async presentAlertExito(message: string) {
    const alert = await this.alertController.create({
      header: 'Informativo',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
