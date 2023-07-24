// const app = express();
const app = require('./server.js')

// Start the server
const port = 3030;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
