import {Client} from 'pg'

const pgDatbase= new Client({
    host: 'localhost',
    port: '5432',
    user:'postgres',
    password:'root',
    database:'bdlorena'
})
pgDatbase.connect()
export default pgDatbase;