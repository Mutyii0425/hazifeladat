// server.js - REST API szerver
const express = require('express');
const cors = require('cors');
const db = require('./data');
const clothingSchema = require('./validation');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

const categories = ['shirts', 'pants', 'shoes', 'jackets', 'accessories'];

// Új ruházati termék hozzáadása
app.post('/api/v1/:category', (req, res) => {
    const { category } = req.params;
    if (!categories.includes(category)) return res.status(400).json({ message: 'Érvénytelen kategória' });

    const { error } = clothingSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { brand, size, color, price, stock } = req.body;
    db.run(`INSERT INTO ${category} (brand, size, color, price, stock) VALUES (?, ?, ?, ?, ?)`,
        [brand, size, color, price, stock],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Sikeres hozzáadás', id: this.lastID });
        }
    );
});

// Összes ruházati termék lekérése adott kategóriában
app.get('/api/v1/:category', (req, res) => {
    const { category } = req.params;
    if (!categories.includes(category)) return res.status(400).json({ message: 'Érvénytelen kategória' });

    db.all(`SELECT * FROM ${category}`, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(rows);
    });
});

// Ruházati termék frissítése
app.put('/api/v1/:category/:id', (req, res) => {
    const { category, id } = req.params;
    if (!categories.includes(category)) return res.status(400).json({ message: 'Érvénytelen kategória' });

    const { error } = clothingSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { brand, size, color, price, stock } = req.body;
    db.run(`UPDATE ${category} SET brand = ?, size = ?, color = ?, price = ?, stock = ? WHERE id = ?`,
        [brand, size, color, price, stock, id],
        function (err) {
            if (err) return res.status(500).json({ error: err.message });
            res.json({ message: 'Sikeres módosítás' });
        }
    );
});

// Ruházati termék törlése
app.delete('/api/v1/:category/:id', (req, res) => {
    const { category, id } = req.params;
    if (!categories.includes(category)) return res.status(400).json({ message: 'Érvénytelen kategória' });

    db.run(`DELETE FROM ${category} WHERE id = ?`, [id], function (err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Sikeres törlés' });
    });
});

// Szerver indítása
app.listen(port, () => {
    console.log(`A szerver fut a ${port}-es porton.`);
});