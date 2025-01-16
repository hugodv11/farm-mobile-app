import * as SQLite from "expo-sqlite";

export const initMigration = async (db: SQLite.SQLiteDatabase) => {
  const configQuery = "PRAGMA foreign_keys = ON;";
  await db.execAsync(configQuery);

  const seasonsQuery = `CREATE TABLE IF NOT EXISTS seasons(
    id INTEGER PRIMARY KEY,
    value TEXT NOT NULL
  );
  
  INSERT OR IGNORE INTO seasons(id, value)
  VALUES
    (0, "All year"),
    (1, "Spring"),
    (2, "Summer"),
    (3, "Fall"),
    (4, "Winter");`;
  await db.execAsync(seasonsQuery);

  const soilTypesQuery = `CREATE TABLE IF NOT EXISTS soil_types(
    id INTEGER PRIMARY KEY,
    value TEXT NOT NULL
  );
  
  INSERT OR IGNORE INTO soil_types(id, value)
  VALUES
    (1, "Loamy"),
    (2, "Clay"),
    (3, "Sandy Loam"),
    (4, "Sandy"),
    (5, "Silty Loam"),
    (6, "Rich Loam");`;
  await db.execAsync(soilTypesQuery);

  const cropsQuery = `CREATE TABLE IF NOT EXISTS crops(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NULL,
    season NUMBER NOT NULL,
    FOREIGN KEY (season)
       REFERENCES seasons (id) 
  );
  
  INSERT OR IGNORE INTO crops(name, description, season)
  VALUES
    ('Wheat', 'A staple cereal crop', 4),
    ('Rice', 'A water-intensive cereal crop', 2),
    ('Maize', 'Versatile grain crop', 1),
    ('Soybeans', 'Protein-rich legume', 1),
    ('Potatoes', 'A root vegetable', 1),
    ('Lettuce', '	A leafy vegetable harvested quickly and suited for continuous cultivation', 0),
    ('Apples', 'Temperate fruit crop', 3);
    `;
  await db.execAsync(cropsQuery);

  const fieldsQuery = `CREATE TABLE IF NOT EXISTS fields(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT NULL,
    soil_PH REAL NULL,
    soil_type NUMBER NOT NULL,
    FOREIGN KEY (soil_type)
       REFERENCES soil_types (id)
  );`;
  await db.execAsync(fieldsQuery);

  const fieldHistoriesQuery = `CREATE TABLE IF NOT EXISTS field_histories(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    start_date TEXT NOT NULL,
    end_date TEXT NULL,
    crop_yield REAL NULL,
    field NUMBER NOT NULL,
    crop NUMBER NOT NULL,
    FOREIGN KEY (field)
       REFERENCES fields (id),
    FOREIGN KEY (crop)
        REFERENCES crops (id)
  );`;
  await db.execAsync(fieldHistoriesQuery);
};
