const { Pool } = require('pg')

// Configuring CORS
exports.corsOptions = {
    origin: "https://localhost:3030",
    optionsSuccessStatus: 200
}

// Create a pool for database connections
exports.pool = new Pool({
    host: 'localhost',
    port: 5432,
    database: 'wmurray3',
    user: 'postgres',
    password: ''
});
