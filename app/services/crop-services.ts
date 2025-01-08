import * as SQLite from "expo-sqlite";

export const getCrops = async (db: SQLite.SQLiteDatabase) => {
  try {
    const results = await db.getAllAsync(
      "SELECT rowid as id, name, description FROM crops",
    );

    return results;
  } catch (error) {
    console.error(error);
    throw Error("Failed to get crops!!!");
  }
};
