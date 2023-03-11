"use strict";

var mongoose = require("mongoose");
var app = require("./app");
var port = 3700;

mongoose.Promise = global.Promise;

mongoose
  .connect(
    "mongodb+srv://natharevolution:tgYinEyskbqzhEu1@portafolio-mean-stack-a.6trbd4w.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("conexion a la base de datos establecida con exito");
    // creacion del servidor
    app.listen(port, () => {
      console.log("servidor corriendo correctamente en la url: localhost:3700");
    });
  })
  .catch((err) => console.log(err));
