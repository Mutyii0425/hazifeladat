// data.js - Adatbázis kezelése
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('fashion.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS shirts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT NOT NULL,
        size TEXT NOT NULL,
        color TEXT NOT NULL,
        material TEXT NOT NULL,
        price REAL NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS pants (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT NOT NULL,
        size TEXT NOT NULL,
        color TEXT NOT NULL,
        material TEXT NOT NULL,
        price REAL NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS shoes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT NOT NULL,
        size TEXT NOT NULL,
        color TEXT NOT NULL,
        material TEXT NOT NULL,
        price REAL NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS jackets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        brand TEXT NOT NULL,
        size TEXT NOT NULL,
        color TEXT NOT NULL,
        material TEXT NOT NULL,
        price REAL NOT NULL
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS accessories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        type TEXT NOT NULL,
        brand TEXT NOT NULL,
        color TEXT NOT NULL,
        material TEXT NOT NULL,
        price REAL NOT NULL
    )`);
});

module.exports = db;