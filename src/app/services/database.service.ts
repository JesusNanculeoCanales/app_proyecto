import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private dbInstance: SQLiteObject | null = null;
  readonly db_name: string = "data.db";
  readonly db_table: string = "users";

  constructor(private sqlite: SQLite) {
    this.createDatabase();
  }

  // Crear la base de datos y la tabla de usuarios
  createDatabase() {
    this.sqlite.create({
      name: this.db_name,
      location: 'default'
    })
    .then((db: SQLiteObject) => {
      this.dbInstance = db;
      console.log('Base de datos creada o abierta');
      db.executeSql(`
        CREATE TABLE IF NOT EXISTS ${this.db_table} (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          nombre TEXT UNIQUE,
          contrasena TEXT
        )
      `, [])
      .then(() => console.log('Tabla de usuarios creada'))
      .catch(e => console.error('Error creando tabla de usuarios', e));
    })
    .catch(e => console.error('Error creando base de datos', e));
  }

  // Agregar un nuevo usuario
  addUser(nombre: string, contrasena: string): Promise<any> {
    if (this.dbInstance) {
      return this.dbInstance.executeSql(`INSERT INTO ${this.db_table} (nombre, contrasena) VALUES (?, ?)`, [nombre, contrasena])
        .then(() => {
          console.log('Usuario agregado');
        })
        .catch(e => {
          console.error('Error agregando usuario', e);
          throw e;
        });
    } else {
      return Promise.reject('Base de datos no inicializada');
    }
  }

  // Validar credenciales de login
  validateUser(nombre: string, contrasena: string): Promise<boolean> {
    if (this.dbInstance) {
      return this.dbInstance.executeSql(`SELECT * FROM ${this.db_table} WHERE nombre = ? AND contrasena = ?`, [nombre, contrasena])
        .then(res => {
          return res.rows.length > 0;
        })
        .catch(e => {
          console.error('Error validando usuario', e);
          return false;
        });
    } else {
      return Promise.resolve(false);
    }
  }

  // Actualizar contraseña
  updatePassword(nombre: string, nuevaContrasena: string): Promise<any> {
    if (this.dbInstance) {
      return this.dbInstance.executeSql(`UPDATE ${this.db_table} SET contrasena = ? WHERE nombre = ?`, [nuevaContrasena, nombre])
        .then(() => {
          console.log('Contraseña actualizada');
        })
        .catch(e => {
          console.error('Error actualizando contraseña', e);
          throw e;
        });
    } else {
      return Promise.reject('Base de datos no inicializada');
    }
  }
}
