require('dotenv').config();

const express = require('express');
const orderRoutes = require('./routes/orderRoutes');
const errorHandler = require('./middlewares/errorHandler');

const app = express();

app.use(express.json());
app.use(orderRoutes);

app.get('/', (req, res) => {
    res.send('API running');
});

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Server running on port 3000');
});