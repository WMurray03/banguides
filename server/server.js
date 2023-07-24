const cors = require('cors');
const express = require('express');
const {getUsers, postUser} = require('./controllers/controllers.Users');
const {
	getTasks, getTask, postTask, putTask, deleteTask,
} = require('./controllers/controllers.Tasks');

// ---- Database Config ----
// const { corsOptions } = require('./config/DatabaseConfig')

// ---- Express ----

const app = express();

app.use(cors());
app.use(express.json());

// ---- Users ----
app.get('/uuid4browser', getUsers);
app.post('/uuid4browser', postUser);

// ---- Tasks ----
app.get('/tasks4uuid', getTasks);
app.get('/tasks4uuid/:id', getTask);
app.post('/tasks4uuid', postTask);
app.put('/tasks4uuid/:id', putTask);
app.delete('/tasks4uuid/:id', deleteTask);

module.exports = app;
