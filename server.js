const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bookRoute = require('./app/routes/book.routes');
const { json } = require('sequelize');

app.use(cors());
app.use(express.json());

const db = require('./app/models');
db.sequelize.sync();

app.use('/api/books', bookRoute);


app.listen(port,() => {
    console.log('Server running on port ${port}');
})