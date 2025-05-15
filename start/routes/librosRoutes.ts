import Router from "@adonisjs/core/services/router";
import librosController from "../../app/controller/librosController.js";

const libros= new librosController
Router.get('/libros',libros.obtenerLibros);
Router.get('/libros/:id',libros.mostrarLibrosId);
Router.post('/libros',libros.crearLibro);
Router.put('/libros/:id',libros.actualizarLibros);
Router.delete('/libros/:id',libros.eliminarLibros);

