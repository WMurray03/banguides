const dotenv = require('dotenv');
const {Pool} = require('pg');

dotenv.config();

// Configuring CORS
exports.corsOptions = {
	origin: 'http://localhost:3030',
	optionsSuccessStatus: 200,
};

// Create a pool for database connections
// exports.pool = new Pool({
// 	host: 'trumpet.db.elephantsql.com',
// 	port: 5432,
// 	database: 'mgxmkpzc',
// 	user: 'mgxmkpzc',
// 	password: 'F_rAbyN5FhJ8KzdL8pQEywYSdQZffaQr',
// });

exports.pool = new Pool({
	connectionString: process.env.DATABASE_URL,
});
