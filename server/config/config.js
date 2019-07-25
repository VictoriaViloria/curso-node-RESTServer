// ===================
//    Puerto
//====================

process.env.PORT = process.env.PORT || 3000;

// ===================
//    Entorno  
//  variable que establece Heroku process.env.NODE_ENV
//  producción? 
//====================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';

// ===================
//    Base de datos 
//====================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = 'mongodb+srv://viloriamon:wXKY2YOOseWLkPGx@cluster0-kyxqi.mongodb.net/cafe';
}

process.env.URLDB = urlDB;