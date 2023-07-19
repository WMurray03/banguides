const bodyParser = require('body-parser');
const { Pool } = require('pg');
const path = require('path');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(bodyParser.json());
app.use(cors());

// Configuring CORS
const corsOptions = {
    origin: "https://localhost:3000",
    optionsSuccessStatus: 200
}

// Create a pool for database connections
const pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'wmurray3',
    user: 'postgres',
    password: ''
});

// GET all users
app.get('/uuid4browser', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM uuid4browser');
        const users = result.rows;
        client.release();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// POST new user
app.post('/uuid4browser', async (req, res) => {
    const newUser = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO uuid4browser(uuid) VALUES ($1);', [newUser.uuid]);
        const insertedUser = result.rows[0];
        client.release();
        res.status(201).json(insertedUser);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET all tasks
app.get('/tasks4uuid', async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tasks4uuid');
        const tasks = result.rows;
        client.release();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// GET a single item by ID
app.get('/tasks4uuid/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM tasks4uuid WHERE browseruuid = $1', [id]);
        const task = result.rows;
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
app.post('/tasks4uuid', async (req, res) => {
    const newTask = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO tasks4uuid(id, content, iscompleted, browseruuid) VALUES ($1, $2, $3, $4);', [newTask.id, newTask.content, newTask.iscompleted, newTask.browseruuid]);
        const insertedTask = result.rows[0];
        client.release();
        res.status(201).json(insertedTask);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// PUT an existing item
app.put('/tasks4uuid/:id', async (req, res) => {
    const targettedItem = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('UPDATE tasks4uuid SET content = $1, iscompleted = $2, browseruuid = $3 WHERE id = $4', [targettedItem.content, targettedItem.iscompleted, targettedItem.browseruuid, targettedItem.id]);

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
app.delete('/tasks4uuid/:id', async (req, res) => {
    const targettedItem = req.body;

    try {
        const client = await pool.connect();
        const result = await client.query('DELETE FROM tasks4uuid WHERE id = $1', [targettedItem.id]);

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

module.exports = app

// // Serve the frontend React application
// app.use(express.static(path.join(__dirname, 'client/build')));

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
// });

// // Start the server
// const port = 3000;
// app.listen(port, () => {
//     console.log(`Server is running on http://localhost:${port}`);
// });
