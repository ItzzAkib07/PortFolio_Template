const express = require("express");
const app = express();
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
const fs = require("fs");
const path = require("path");
const { ok } = require("assert");
const port = 8000;

app.use('/static', express.static('static'))
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect('mongodb://localhost:27017/Data', { useNewUrlParser: true, useUnifiedTopology: true });


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));



const detailsSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  message: String
});

const details = mongoose.model('details', detailsSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
});


app.post('/', (req, res) => {
    const myData = new details({
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      message:req.body.message
    });

myData.save();
res.redirect('/')
}); 
      
app.listen(port, () => {
console.log(`the app is started successfully on port ${port}`)
})
 


