const mongoose = require("mongoose");
//valida los campos que deben ser unicos
let uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let terapiasSchema = new Schema(
  {
    sindrome_down: {
      type: Number,
      default: 0,
    },

    paralisis_cerebral: {
      type: Number,
      default: 0,
    },

    parkinson: {
      type: Number,
      default: 0,
    },

    hemiplejia: {
      type: Number,
      default: 0,
    },

    hemiparesia: {
      type: Number,
      default: 0,
    },

    asma: {
      type: Number,
      default: 0,
    },

    epoc: {
      type: Number,
      default: 0,
    },

    tuberculosis: {
      type: Number,
      default: 0,
    },

    fibrosis_quistica: {
      type: Number,
      default: 0,
    },

    bronquitis_cronica: {
      type: Number,
      default: 0,
    },

    luxaciones: {
      type: Number,
      default: 0,
    },

    tendinitis: {
      type: Number,
      default: 0,
    },

    esguinces: {
      type: Number,
      default: 0,
    },

    desgarros: {
      type: Number,
      default: 0,
    },

    fracturas: {
      type: Number,
      default: 0,
    },
    diagnostico: {
      type: String,
      default: "Sin tratamiento",
    },
  },
  { collection: "terapias" }
);

module.exports = mongoose.model("terapias", terapiasSchema);

