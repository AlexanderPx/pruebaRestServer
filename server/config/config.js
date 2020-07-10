//puerto
process.env.PORT = process.env.PORT || 3000


//Entorno


process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

//BAse de datos

let urlDB;

if (process.eventNames.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/impresoras'

} else {
    urlDB = 'mongodb+srv://impresoras-user:PyEdv2pgBjdMP1QX@impresoras.bsqco.mongodb.net/test'
}

process.env.URLDB = urlDB;