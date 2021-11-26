const express = require('express');
const bodyParser = require('body-parser');

const app = express()
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());



app.get('/', (req,res)=>{
    res.send('Server is up and running');
})


app.listen(PORT, (msg,err)=>{
    console.log(`Server Listening on Port ${PORT}`)
})