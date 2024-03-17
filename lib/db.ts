import * as SQLite from "expo-sqlite";

export const setupDatabase = () => {
    const db = SQLite.openDatabase("tarea7.db");
    return db;
};