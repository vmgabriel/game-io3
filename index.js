const express = require('express');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const path = require('path');

let jugador = require("./db/jugador").Jugador;
let puntaje = require("./db/puntaje").Puntaje;

let app = express();

//Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

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
  let persona = new jugador({_id: parseInt(req.body.codigo)});
  let nPuntaje = new puntaje({ puntaje: parseInt(req.body.puntaje), fechaIntento: Date.now(), numeroIntento: 3 ,jugador: persona._id});
  nPuntaje.save().then(function() {
      console.log("hecho");
    }, function(err) {
      console.log(String(err));
    });
  console.log("hecho");
  res.redirect("/puntaje");
});

app.get("/creditos", (req, res) => {
  res.render("creditos");
});

app.get("/404", (req, res) => {
  res.render("404", {comentario: "Pagina No Encontrada"});
});

const puerto = 8080;

app.listen(puerto);
