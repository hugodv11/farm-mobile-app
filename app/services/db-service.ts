import * as SQLite from "expo-sqlite";

export const createDefaultTables = async (db: SQLite.SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS crops(
                  name TEXT NOT NULL,
                  description TEXT NOT NULL
                );`;

  await db.execAsync(query);
};

export const defaultInserts = async (db: SQLite.SQLiteDatabase) => {
  const query = `INSERT INTO crops(name, description)
                 VALUES('Tomato', 'A red fruit that is used in salads and sauces.');`;

  await db.execAsync(query);
};
