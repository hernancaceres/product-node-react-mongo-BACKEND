import mongoose from "mongoose";
import { settingDotEnv } from "../config.js";

const { db } = settingDotEnv();

mongoose
  .connect(db.host)
  .then((db) => console.log("Base de datos conectada"))
  .catch((err) => console.log("Error al conectarse a Mongodb"));




/*
import mongoose from 'mongoose'
const url = 'mongodb://localhost:27017/pnrm'
mongoose.connect(url)

const db = mongoose.connection
db.on('open', ()=>{ console.log("¡Conectado a MongoDB!")} )
db.on('error', ()=>{ console.log("¡Error al conectar a MongoDB!")} )

export default db

*/