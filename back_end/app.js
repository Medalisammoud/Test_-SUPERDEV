const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const eventsRoutes = require('./routes/eventsRoutes');

const app = express();

// Middlewares
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/events', eventsRoutes);

module.exports = app;
