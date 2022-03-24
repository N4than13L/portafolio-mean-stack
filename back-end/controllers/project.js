'use strict'

var Project = require('../models/project')
var fs = require('fs')
var path = require('path')

var Controller = {
     home: function(req, res){
          return res.status(200).send({
               message: 'Soy la home.'
          })
     },

     test: function(req, res){
          return res.status(200).send({
               message: 'soy el metodo o accion de test del Controlador de proyect.'
          })
     },

     saveProyect: function(req, res){
          var project = new Project()

          var params = req.body
          project.name = params.name
          project.description = params.description
          project.category = params.category
          project.year = params.year
          project.langs = params.langs
          project.image = null

          project.save( (error, projectStored) =>{
               if(error)return res.status(500).send({message: "Error al guardar documento."})
               if(!projectStored) return res.status(404).send({message: "No se ha podido guardar el proyecto"})
               
               return res.status(200).send({project: projectStored})
          })
     },

     getProject: function(req, res){
          var projectId = req.params.id

          if (!projectId == null) {
               return res.status(404).send({message: 'El proyecto no existe'})
          }

          Project.findById(projectId, (err, project) => {
               if(err) return res.status(500).send({message: 'Error al devolver los datos.'})
               if (!project) return res.status(404).send({message: 'El proyecto no existe.'})
               return res.status(200).send({project})
          })
     },

     getProjects: function(req, res){
          Project.find({}).sort('-year').exec((err, projects) => {
               if(err) return res.status(500).send({message: "error al devolver los datos."})

               if (!projects) return res.status(404).send({message: "No hay proyectos que mostrar."})
               
               return res.status(200).send({projects})
          })
     },

     updateProyect: function(req, res){
          var projectID = req.params.id

          var update = req.body

          Project.findByIdAndUpdate(projectID, update, {new: true}, (err, projectUpdate) => {
               if(err) return res.status(500).send({message: "Error al actualizar"})
               if(!projectUpdate) return res.status(404).send({message: "No existe el proyecto para actualizar"})

               return res.status(200).send({
                    Project: projectUpdate
               })
          } )
     },

     deleteProyect: function(req, res){
          var projectID = req.params.id
          Project.findByIdAndRemove(projectID, (err, projectDelete) =>{
               if(err) return res.status(500).send({message: "no se ha podido borrar el proyecto"})
               if(!projectDelete) return res.status(404).send({message: "No se pued eliminar el proyecto"})
               return res.status(200).send({
                    Project: projectDelete
               })
          })
     },

     uploadImage: function(req, res) {
          var projectId = req.params.id
          var fileName = 'Imagen no subida..'

          if (req.files) {
               
               var filePath = req.files.image.path
               var fileSplit = filePath.split('\\')
               var fileName = fileSplit[1]

               var exSplit = fileName.split('\.')
               var fileExt = exSplit[1]

               if(fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif'){
                    Project.findByIdAndUpdate(projectId, {image: fileName},{new: true}, (err, projectUpdate) =>{
                    
                         if(err) return res.status(500).send({message: "imagen no se ha subido"})
                         
                         if(!projectUpdate) return res.status(404).send({message: "El proyecto no existe"}) 
                         
                         return res.status(200).send({
                              project: projectUpdate
                         })
                    })
               }else{
                    fs.unlink(filePath, (err) =>{
                         return res.status(200).send({message: "La extencion no es valida"})
                    })
               }
               
          }
          else{
               return res.status(200).send({
                    messages: fileName
               })
          }
     },

     getImageFile: function(req, res){
          var file = req.params.image
          var pathFile = './uploads/' + file

          fs.exists(pathFile, (exists) =>{
               if(exists){
                    return res.sendFile(path.resolve(pathFile))
               }else{
                    return res.status(200).send({
                         message: "No existe la imagen..."
                    })
               }
          })
     } 

}
module.exports = Controller

