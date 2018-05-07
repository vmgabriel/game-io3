const mongoose = require("mongoose");
let Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/game-io3');

let jugadorSchema = new Schema({
  _id: Number,
  nombre: String,
  grupo: Number,
  intentos: Number
});

var Jugador = mongoose.model("Jugador", jugadorSchema);

module.exports.Jugador = Jugador;
