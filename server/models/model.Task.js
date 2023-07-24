const {pool} = require('../config/DatabaseConfig');

// GET all users
exports.selectTasks = async () => pool.query('SELECT * FROM tasks4uuid')
	.then(result => result.rows);

exports.selectTask = async uuid => pool.query('SELECT * FROM tasks4uuid WHERE browseruuid = $1;', [uuid])
	.then(result => result.rows);

exports.createTask = async body => pool.query('INSERT INTO tasks4uuid(id, content, iscompleted, browseruuid) VALUES ($1, $2, $3, $4);', [body.id, body.content, body.iscompleted, body.browseruuid]);

exports.updateTask = async body => pool.query('UPDATE tasks4uuid SET content = $1, iscompleted = $2, browseruuid = $3 WHERE id = $4', [body.content, body.iscompleted, body.browseruuid, body.id]);

exports.removeTask = async id => pool.query('DELETE FROM tasks4uuid WHERE id = $1', [id]);
