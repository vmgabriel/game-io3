const express = require('express');
const bodyParser = require('body-parser');

let app = express();

//Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Motor de Vista
app.set("view engine", "pug");

// Rutas
app.get("/", (req, res) => {
  res.render("index");
})

app.get("/puntaje", (req, res) => {
  res.render("puntaje");
})

app.get("/juego", (req, res) => {
  //req.query.code
  if (!req.query.code){
    res.redirect("/404");
  } else {
    console.log(req.query.code);
  }
  res.render("juego");
})

app.get("/404", (req, res) => {
  res.render("404");
})

const puerto = 8080;

app.listen(puerto);
