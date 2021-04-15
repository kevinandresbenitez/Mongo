var express =require('express');
var bodyparser=require('body-parser');
var session=require('express-session');
var flash=require('express-flash');
var mongose=require('mongoose');

var aplicacion=express();


// configuraciones
aplicacion.use(bodyparser.json());
aplicacion.use(bodyparser.urlencoded({extended:false}));

aplicacion.use(session({secret:'po31op2n4i5bo2b5', saveUninitialized:true,resave:true}));
aplicacion.use(flash());

aplicacion.set("view engine","ejs");
aplicacion.use(express.static("./public"))


// Configuracion servidor 

mongose.connect('mongodb://localhost/Usuario' ,{ useNewUrlParser: true , useUnifiedTopology: true })
    .then((res)=>{
        console.log("Conectado a la base de datos correctamente")
    })
    .catch(()=>{
        console.log("Error al conectarse a la base de datos")
    })


// modelos
var Usuario =require('./models/Usuario');
var Telefono =require('./models/Telefono');

//Direcciones
    var publics =require('./routes/publics');
    var admin =require('./routes/admin');



// usando direcciones
aplicacion.use(publics);
aplicacion.use(admin);






// Puerto de el servidor 
var port=process.env.PORT ? process.env.PORT:8080
aplicacion.listen(port ,function(){
    console.log(`Servidor iniciado en el  puerto ${port}`)
})







