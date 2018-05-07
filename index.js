const express = require('express');
const bodyParser = require('body-parser');

let jugador = require("./db/jugador").Jugador;
let puntaje = require("./db/puntaje").Puntaje;

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
});

app.get("/puntaje", (req, res) => {
  puntaje.find({},[],{sort: {puntaje: -1}})
    .populate('jugador')
    .exec((err, docs) => {
      res.render("puntaje", {datos: docs});
  });
});

app.get("/menu", (req, res) => {
  //req.query.code
  if (!req.query.code){
    res.render("404", {comentario: "Datos no Introducidos"});
  } else {
    jugador.findOne({_id: req.query.code}, (err, doc) => {
      if (err) {console.log(err);}
      if (!doc) {
        res.render("404", {comentario: "Codigo no Encontrado"});
      }
      else {
        res.render("menu", {code: req.query.code});
      }
    });
  }
});

app.get("/juego", (req, res) => {
  //req.query.code
  if (!req.query.code){
    res.render("404", {comentario: "Datos no Introducidos"});
  } else {
    jugador.findOne({_id: req.query.code}, (err, doc) => {
      if (err) {console.log(err);}
      if (!doc) {
        res.render("404", {comentario: "Codigo no Encontrado"});
      }
      else {
        res.render("juego");
      }
    });
  }
});

app.post("/puntaje", (req, res) => {
  console.log(req.datos);
});

app.get("/creditos", (req, res) => {
  res.render("creditos");
});

app.get("/404", (req, res) => {
  res.render("404", {comentario: "Pagina No Encontrada"});
});

const puerto = 8080;

app.listen(puerto);
