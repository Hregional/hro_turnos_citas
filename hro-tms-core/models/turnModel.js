import mongoose from "mongoose";

const TurnSchema = new mongoose.Schema({
  codigo: Number,
  persona: Number,
  noHistoriaClinica: String,
  nombres: String,
  apellidos: String,
  fechaNacimiento: String,
  sexo: String,
  nombre_Resposable: String,
  direccion_Responsable: String,
  telefono_Responsable: String,
  nombreMadre: String,
  nombrePadre: String,
  lugarNacimiento: String,
  archivo_Fisico: Boolean,
  timestamp: Date,
  status: String,
  areaName: String,
  areaId: Number,
  numero: Number,
  updatedAt: Date,
});

export default mongoose.model("Turn", TurnSchema);
