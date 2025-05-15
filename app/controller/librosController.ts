import pgDatbase from "../database/pgDatabase.js";

class librosController{
    async obtenerLibros({request,response}){
        const result= await pgDatbase.query('SELECT * FROM libros')
        console.log(result.rows)
        return response.json({mensaje:result.rows})
    }
    async mostrarLibrosId({params,request,response}){
        const id= params.id
        const result= await pgDatbase.query('SELECT * FROM libros where id=$1',[id])
        console.log(result)
        return response.json({mensaje:result.rows})
    }
    async crearLibro({request,response}) {
    try {
        const { titulo, autor, anio_publicacion } = request.body();
        if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
            return response.status(400).json({ 
                error: 'El título es obligatorio y debe ser un texto válido' 
            });
        }

        if (!autor || typeof autor !== 'string' || autor.trim().length === 0) {
            return response.status(400).json({ 
                error: 'El autor es obligatorio y debe ser un texto válido' 
            });
        }

        if (!anio_publicacion || typeof anio_publicacion !== 'number' || 
            anio_publicacion.toString().length !== 4) {
            return response.status(400).json({ 
                error: 'El año de publicación es obligatorio y debe ser un número de 4 dígitos' 
            });
        }
        const result = await pgDatbase.query(
            'INSERT INTO libros (titulo, autor, anio_publicacion) VALUES ($1, $2, $3) RETURNING *',
            [titulo, autor, anio_publicacion]
        );

        return response.status(201).json({ 
            mensaje: 'Libro creado exitosamente', 
            libro: result.rows[0] 
        });

    } catch (error) {
        console.error('Error al crear libro:', error);
        return response.status(500).json({ 
            error: 'Error interno del servidor al crear el libro' 
        });
    }
  }
    async actualizarLibros({ params, request, response }) {
    try {
        const { titulo, autor, anio_publicacion } = request.body();
        const { id } = params;
        if (!titulo || typeof titulo !== 'string' || titulo.trim().length === 0) {
            return response.status(400).json({ 
                error: 'El título es obligatorio y debe ser un texto válido' 
            });
        }
        if (!autor || typeof autor !== 'string' || autor.trim().length === 0) {
            return response.status(400).json({ 
                error: 'El autor es obligatorio y debe ser un texto válido' 
            });
        }
        if (!anio_publicacion || typeof anio_publicacion !== 'number' || 
            anio_publicacion.toString().length !== 4) {
            return response.status(400).json({ 
                error: 'El año de publicación es obligatorio y debe ser un número de 4 dígitos' 
            });
        }
        const result = await pgDatbase.query(
            'UPDATE libros SET titulo = $1, autor = $2, anio_publicacion = $3 WHERE id = $4 RETURNING *',
            [titulo, autor, anio_publicacion, id]
        );
        if (result.rowCount === 0) {
            return response.status(404).json({ 
                error: 'Libro no encontrado con el ID proporcionado' 
            });
        }
        return response.status(200).json({ 
            mensaje: 'Libro actualizado exitosamente', 
            libro: result.rows[0] 
        });
    } catch (error) {
        console.error('Error al actualizar libro:', error);
        return response.status(500).json({ 
            error: 'Error interno del servidor al actualizar el libro',
            detalles: error.message 
        });
    }
}
    async eliminarLibros({params,request,response}){
        const id= params.id
        const result= await pgDatbase.query('delete from libros where id=$1',[id])
        console.log(result)
        return response.json({mensaje:`el libro con id ${id} a sido eliminado`})
    }
}
export default librosController;