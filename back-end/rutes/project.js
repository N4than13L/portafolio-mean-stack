"use strict";

var express = require("express");
var ProyectController = require("../controllers/project");

var router = express.Router();

const multipart = require("connect-multiparty");
var multiPartMiddleWeare = multipart({ uploadDir: "./uploads" });

router.get("/home", ProyectController.home);
router.post("/test", ProyectController.test);
router.post("/Save-project", ProyectController.saveProyect);
router.get("/project/:id", ProyectController.getProject);
router.get("/projects", ProyectController.getProjects);
router.put("/project-update/:id", ProyectController.updateProyect);
router.delete("/project-delete/:id", ProyectController.deleteProyect);

router.post(
  "/upload-image/:id",
  multiPartMiddleWeare,
  ProyectController.uploadImage
);
router.get("/get-image/:image", ProyectController.getImageFile);
module.exports = router;
