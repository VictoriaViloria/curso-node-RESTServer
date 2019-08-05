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
//    Vencimiento del TOKEN
//====================
//60 segundos
// 60 minutos
// 24 horas
// 30 dias
process.env.CADUCIDAD_TOKEN = 60 * 60 * 24 * 30;

// ===================
//    SEED de Autenticación
// voy a declarame una variable en heroku que sea process.env.SEED
//====================
process.env.SEED = process.env.SEED || 'este-es-el-seed-desarrollo';

// ===================
//    Base de datos 
//====================
let urlDB;

if (process.env.NODE_ENV === 'dev') {
    urlDB = 'mongodb://localhost:27017/cafe';
} else {
    urlDB = process.env.MONGO_URI;
}

process.env.URLDB = urlDB;

// ===================
//    Google Client ID
//====================

process.env.CLIENT_ID = process.env.CLIENT_ID || '901367502360-e3qrlue1ohgkbuqbvh1inpjndkm4rk0e.apps.googleusercontent.com';