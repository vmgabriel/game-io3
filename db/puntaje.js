const mongoose = require("mongoose");
let Schema = mongoose.Schema;

mongoose.connect('mongodb://localhost/game-io3');

let puntajeSchema = new Schema({
  puntaje: Number,
  fechaIntento: Date,
  numeroIntento: Number,
  jugador: {type: Schema.Types.ObjectId, ref: "Jugador"}
});

let Puntaje = mongoose.model("Puntaje", puntajeSchema);

module.exports.Puntaje = Puntaje;
