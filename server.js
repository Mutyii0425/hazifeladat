const express = require('express');
const bodyParser = require('body-parser');
const db = require('./data');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// Általános lekérdező végpont minden táblához
app.get('/:table', (req, res) => {
    const { table } = req.params;
    const validTables = ['shirts', 'pants', 'shoes', 'jackets', 'accessories'];
    
    if (!validTables.includes(table)) {
        return res.status(400).json({ error: 'Érvénytelen tábla' });
    }

    db.all(`SELECT * FROM ${table}`, (err, rows) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(rows);
    });
});

// Új elem hozzáadása
app.post('/:table', (req, res) => {
    const { table } = req.params;
    const validTables = {
        shirts: ['brand', 'size', 'color', 'material', 'price'],
        pants: ['brand', 'size', 'color', 'material', 'price'],
        shoes: ['brand', 'size', 'color', 'material', 'price'],
        jackets: ['brand', 'size', 'color', 'material', 'price'],
        accessories: ['type', 'brand', 'color', 'material', 'price']
    };

    if (!validTables[table]) {
        return res.status(400).json({ error: 'Érvénytelen tábla' });
    }

    const columns = validTables[table].join(', ');
    const values = validTables[table].map(() => '?').join(', ');
    const params = validTables[table].map(col => req.body[col]);

    db.run(`INSERT INTO ${table} (${columns}) VALUES (${values})`, params, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id: this.lastID });
    });
});

// Elem törlése
app.delete('/:table/:id', (req, res) => {
    const { table, id } = req.params;
    const validTables = ['shirts', 'pants', 'shoes', 'jackets', 'accessories'];
    
    if (!validTables.includes(table)) {
        return res.status(400).json({ error: 'Érvénytelen tábla' });
    }

    db.run(`DELETE FROM ${table} WHERE id = ?`, id, function(err) {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ message: 'Sikeresen törölve', changes: this.changes });
    });
});

app.listen(PORT, () => {
    console.log(`Szerver fut a http://localhost:${PORT} címen`);
});
