
import sqlite3 from 'sqlite3';
import { open, Database as SQLiteDatabase } from 'sqlite';

let dbInstance: SQLiteDatabase;

export const initializeDatabase = async (dbName: String): Promise<SQLiteDatabase> => {
  if (dbInstance) {
    return dbInstance;
  }

  dbInstance = await open({
    filename: `./${dbName}.db`,
    driver: sqlite3.Database,
  });

  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS books (
      id TEXT PRIMARY KEY,
      title TEXT,
      author TEXT,
      quantity INTEGER
    )
  `);

  return dbInstance;
};
