import pgDatbase from "../database/pgDatabase.js";

class editorialesController{
    async obtenerEditoriales({request,response}){
        const result=await pgDatbase.query('select * from editoriales')
        console.log(result.rows)
        return response.json({mensaje:result.rows})
    }
    async mostrarEditorialesId({params,request,response}){
        const id= params.id
        const result= await pgDatbase.query('select * from editoriales where id=$1',[id])
        console.log(result)
        return response.json({mensaje:result.rows})
    }
    async crearEditoriales({request,response}){
        const {nombre,pais}= request.body()
        const result= await pgDatbase.query('INSERT INTO libros (nombre,pais) VALUES ($2,$3)',[nombre,pais])
        console.log(result)
        return response.json({mensaje:'la editorial a sido creada',nombre,pais})
    }
    async actualizarEditorial({params,request,response}){
        const {nombre,pais}= request.body()
        const id= params.id
        const result= await pgDatbase.query('UPDATE editoriales set nombre=$2, pais=$3 where id=$1',[id,nombre,pais])
        console.log(result)
        return response.json({mensaje:`la editoria de id ${id} se actualizo`})
    }
    async eliminarEditorial({params,request,response}){
        const id= params.id
        const result=  await pgDatbase.query('delete from editoriales where id=$1',[id])
        console.log(result)
        return response.json({mensaje:`la editorial de id ${id} se ha eliminado`})
    }
    async listarlibrosEditorial({params,request,response}){
        const id= params.id
        const result= await pgDatbase.query('SELECT * FROM libros WHERE editorial_id = $1',[id])
        return response.json({mensaje:result.rows})
    }
    async listarLibrosAnio({params,request,response}){
        const anio_publicacion= params.anio_publicacion
        const result= await pgDatbase.query('SELECT * FROM libros where anio_publicacion=$1',[anio_publicacion])
        return response.json({mensaje:result.rows})
    }
    async buscarPalabraLibro({params,request,response}){
        const titulo= params.titulo
        const result= await pgDatbase.query('SELECT * FROM libros WHERE titulo LIKE $1 ORDER BY titulo',[`%${titulo}%`])
        return response.json({mensaje: result.rows})
    }
}
export default editorialesController;