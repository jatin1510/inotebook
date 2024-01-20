const connectToMongoDB = require('./db');
const express = require('express');
const morgan = require('morgan')
const cors = require('cors');

connectToMongoDB();

const app = express();
const PORT = 8000;

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

// Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(PORT, () => {
    console.log(`iNotebook Backend listening at http://localhost:${PORT}`);
})