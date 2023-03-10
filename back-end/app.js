"use strict";

var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var cors = require("cors");

// archivos de  rutas

var proyect_routes = require("./rutes/project");

// middleweares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// CORS
app.use(cors());

//rutas
app.use("/api", proyect_routes);

// exportar
module.exports = app;
