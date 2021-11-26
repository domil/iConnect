const express = require('express');
const bodyParser = require('body-parser');
const {feedbackRouter} = require('./routes');

require('./db');

const app = express()
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

app.use('/feedback', feedbackRouter)


app.get('/', (req,res)=>{
    res.send('Server is up and running');
})


app.listen(PORT, (msg,err)=>{
    console.log(`Server Listening on Port ${PORT}`)
})