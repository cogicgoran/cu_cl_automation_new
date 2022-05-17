if (process.env.NODE_ENV !== 'production') require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const webhookRoute = require('./routes/webhook');

app.use(bodyParser.json());
app.use(webhookRoute);
app.listen(port, () =>{
    console.log('Server is up on port 3000.')
})