// Const app = express();
const app = require('./server');

// Start the server
const port = 3030;
app.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});
