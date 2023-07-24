const { pool } = require('../config/DatabaseConfig')

// GET all users
exports.selectTasks = async () => {
    return pool.query('SELECT * FROM tasks4uuid')
    .then((result) => {
        return result.rows;
    })
}

exports.selectTask = async (uuid) => {
    return pool.query('SELECT * FROM tasks4uuid WHERE browseruuid = $1;', [uuid])
    .then((result) => {
        return result.rows;
    })
}

exports.createTask = async (body) => {
    return pool.query('INSERT INTO tasks4uuid(id, content, iscompleted, browseruuid) VALUES ($1, $2, $3, $4);', [body.id, body.content, body.iscompleted, body.browseruuid])
}

exports.updateTask = async (body) => {
    return pool.query('UPDATE tasks4uuid SET content = $1, iscompleted = $2, browseruuid = $3 WHERE id = $4', [body.content, body.iscompleted, body.browseruuid, body.id])
}

exports.removeTask = async (id) => {
    return pool.query('DELETE FROM tasks4uuid WHERE id = $1', [id])
}
