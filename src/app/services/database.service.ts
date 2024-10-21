import { Injectable } from '@angular/core';
import { CapacitorSQLite, SQLiteDBConnection } from '@capacitor-community/sqlite';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private db!: SQLiteDBConnection;

  constructor() {}

  async initDB() {
    try {
      // Crear la conexión a la base de datos
      const dbConnection = await CapacitorSQLite.createConnection({
        database: 'my_db',
        version: 1,
        encrypted: false,
        mode: 'no-encryption',
        readonly: false,
      });

      // Asegúrate de que la conexión sea válida
      if (dbConnection) {
        this.db = dbConnection as SQLiteDBConnection; // Asegura el tipo de conexión
        await this.db.open();  // Abrir la base de datos

        // Crear la tabla si no existe
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre TEXT NOT NULL,
            correo TEXT NOT NULL UNIQUE,
            password TEXT NOT NULL
          );
        `;
        await this.db.execute(createTableQuery);
        console.log('Tabla "usuarios" creada correctamente.');
      } else {
        throw new Error('No se pudo establecer una conexión con la base de datos.');
      }
    } catch (error) {
      console.error('Error al inicializar la base de datos:', error);
    }
  }

  // Función para registrar un nuevo usuario
  async registerUser(nombre: string, correo: string, password: string): Promise<void> {
    try {
      const checkQuery = `SELECT * FROM usuarios WHERE correo = ?;`;
      const result = await this.db.query(checkQuery, [correo]);

      // Verifica si el correo ya está registrado
      if (result.values && result.values.length > 0) {
        console.log('El usuario ya existe.');
        throw new Error('El usuario ya está registrado');
      }

      // Si no existe, insertar el nuevo usuario
      const insertQuery = `
        INSERT INTO usuarios (nombre, correo, password)
        VALUES (?, ?, ?);
      `;
      await this.db.run(insertQuery, [nombre, correo, password]);
      console.log('Usuario registrado exitosamente.');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }

  // Función para iniciar sesión
  async loginUser(correo: string, password: string): Promise<any> {
    try {
      const query = `
        SELECT * FROM usuarios WHERE correo = ? AND password = ?;
      `;
      const result = await this.db.query(query, [correo, password]);

      if (result.values && result.values.length > 0) {
        return result.values[0];  // Usuario encontrado
      } else {
        throw new Error('Usuario no encontrado o contraseña incorrecta');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      throw error;
    }
  }
}
