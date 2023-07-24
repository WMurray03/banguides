const { selectTasks, selectTask, createTask, updateTask, removeTask } = require('../models/model.Task')

exports.getTasks = (req, res, next) => {
    selectTasks()
        .then((tasks) => {
            res.status(200).send({ tasks })
        })
        .catch((error) => {
            console.log(error)
        })
}

exports.getTask = (req, res, next) => {
    selectTask(req.params.id)
        .then((task) => {
            res.status(200).send({ task })
        })
        .catch((error) => {
            console.log(error)
        })
}

exports.postTask = (req, res, next) => {
    createTask(req.body)
        .then(() => {
            res.status(200).send(req.body)
        })
        .catch((error) => {
            console.log(error)
        })
}

exports.putTask = (req, res, next) => {
    updateTask(req.body)
    .then(() => {
        res.status(200).send(req.body)
    })
    .catch((error) => {
        console.log(error)
    })
}

exports.deleteTask = (req, res, next) => {
    removeTask(req.params.id)
    .then(() => {
        res.status(200).send(req.params.id)
    })
    .catch((error) => {
        console.log(error)
    })
}

// // GET all tasks
// function getTasks() {
//     app.get('/tasks4uuid', async (req, res) => {
//         try {
//             const client = await pool.connect();
//             const result = await client.query('SELECT * FROM tasks4uuid');
//             const tasks = result.rows;
//             client.release();
//             res.json(tasks);
//         } catch (error) {
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     });
// }

// function getTask() {
//     // GET a single task by ID
//     app.get('/tasks4uuid/:id', async (req, res) => {
//         const id = req.params.id;
//         try {
//             const client = await pool.connect();
//             const result = await client.query('SELECT * FROM tasks4uuid WHERE browseruuid = $1', [id]);
//             const task = result.rows;
//             client.release();
//             if (task) {
//                 res.json(task);
//             } else {
//                 res.status(404).json({ error: 'Task not found' });
//             }
//         } catch (error) {
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     });
// }

// function createTask() {
//     // POST a new task
//     app.post('/tasks4uuid', async (req, res) => {
//         const newTask = req.body;
//         try {
//             const client = await pool.connect();
//             const result = await client.query('INSERT INTO tasks4uuid(id, content, iscompleted, browseruuid) VALUES ($1, $2, $3, $4);', [newTask.id, newTask.content, newTask.iscompleted, newTask.browseruuid]);
//             const insertedTask = result.rows[0];
//             client.release();
//             res.status(201).json(insertedTask);
//         } catch (error) {
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     });
// }

// function updateTask() {
//     // PUT an existing task
//     app.put('/tasks4uuid/:id', async (req, res) => {
//         const targettedItem = req.body;

//         try {
//             const client = await pool.connect();
//             const result = await client.query('UPDATE tasks4uuid SET content = $1, iscompleted = $2, browseruuid = $3 WHERE id = $4', [targettedItem.content, targettedItem.iscompleted, targettedItem.browseruuid, targettedItem.id]);

//             const updatedRowCount = result.rowCount;
//             const updatedItemData = result.rows[0];
//             client.release();

//             if (updatedRowCount > 0) {
//                 res.json(updatedItemData);
//             } else {
//                 res.status(404).json({ error: 'Task not found' });
//             }
//         } catch (error) {
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     });
// }

// function deleteTask() {
//     // DELETE a task
//     app.delete('/tasks4uuid/:id', async (req, res) => {
//         const targettedItem = req.body;

//         try {
//             const client = await pool.connect();
//             const result = await client.query('DELETE FROM tasks4uuid WHERE id = $1', [targettedItem.id]);

//             const deletedRowCount = result.rowCount;
//             const deletedItemData = result.rows[0];
//             client.release();

//             if (deletedRowCount > 0) {
//                 res.json(deletedItemData);
//             } else {
//                 res.status(404).json({ error: 'Task not found' });
//             }
//         } catch (error) {
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     });
// }

// module.exports = getTasks, getTask, createTask, updateTask, deleteTask