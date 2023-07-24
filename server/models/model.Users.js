const { pool } = require('../config/DatabaseConfig')

// GET all users
exports.selectUsers = async () => {
    return pool.query('SELECT * FROM uuid4browser')
    .then((result) => {
        return result.rows;
    })
}

exports.createUser = async (uuid) => {
    return pool.query('INSERT INTO uuid4browser(uuid) VALUES ($1);', [uuid])
}

// app.get('/uuid4browser', async (req, res) => {
//     try {
//         const client = await pool.connect();
//         const result = await client.query('SELECT * FROM uuid4browser');
//         const users = result.rows;
//         client.release();
//         res.json(users);
//     } catch (error) {
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// POST new user
// function postUser() {
//     return app.post('/uuid4browser', async (req, res) => {
//         const newUser = req.body;
//         try {
//             const client = await pool.connect();
//             const result = await client.query('INSERT INTO uuid4browser(uuid) VALUES ($1);', [newUser.uuid]);
//             const insertedUser = result.rows[0];
//             client.release();
//             res.status(201).json(insertedUser);
//         } catch (error) {
//             res.status(500).json({ error: 'Internal Server Error' });
//         }
//     });
// }