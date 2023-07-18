const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Create a pool for database connections
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'wmurray3',
    user: 'postgres',
    password: ''
});

// GET all items
app.get('/tasks', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tasks');
        const tasks = result.rows;
        client.release();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET a single item by ID
app.get('/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tasks WHERE id = $1', [id]);
        const task = result.rows[0];
        client.release();
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST a new item
app.post('/tasks', async (req, res) => {
    const newTask = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO tasks(id, content, iscompleted) VALUES ($1, $2, $3);', [newTask.id, newTask.content, newTask.iscompleted]);
        const insertedTask = result.rows[0];
        client.release();
        res.status(201).json(insertedTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT (update) an existing item
app.put('/tasks/:id', async (req, res) => {
    const targettedItem = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('UPDATE tasks SET content = $1, iscompleted = $2 WHERE id=$3', [targettedItem.content, targettedItem.iscompleted, targettedItem.id]);

        const updatedRowCount = result.rowCount;
        const updatedItemData = result.rows[0];
        client.release();

        if (updatedRowCount > 0) {
            res.json(updatedItemData);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// DELETE an item
app.delete('/tasks/:id', async (req, res) => {
    const targettedItem = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM tasks WHERE id = $1', [targettedItem.id]);

        const deletedRowCount = result.rowCount;
        const deletedItemData = result.rows[0];
        client.release();

        if (deletedRowCount > 0) {
            res.json(deletedItemData);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Serve the frontend React application
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
