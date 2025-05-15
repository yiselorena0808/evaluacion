import editorialesController from "../../app/controller/editorialesController.js";
import Router from "@adonisjs/core/services/router";

const editoriales = new editorialesController()
Router.get('/editoriales',editoriales.obtenerEditoriales);
Router.get('/editoriales/:id',editoriales.mostrarEditorialesId);
Router.post('/editoriales',editoriales.crearEditoriales);
Router.put('/editoriales/:id',editoriales.actualizarEditorial);
Router.delete('/editoriales/:id',editoriales.eliminarEditorial);

Router.get('/editoriales/:id/libros',editoriales.listarlibrosEditorial);
Router.get('/libros/anio_publicacion/:anio_publicacion',editoriales.listarLibrosAnio);
Router.get('/libros/buscarPalabraLibro/:titulo',editoriales.buscarPalabraLibro);

