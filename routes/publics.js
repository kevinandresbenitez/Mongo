var express =require('express');
var session=require('express-session');


var router =express.Router();
router.use(session({secret:true, saveUninitialized:true,resave:true}));


//modelos

var Usuario =require('../models/Usuario');
var Telefono =require('../models/Telefono');




router.get('/',async function(ped,res){

    var Users =await Usuario.find().populate("Telefono");
    var phones=await Telefono.find();



    res.render('pages/home',{
        Users,phones,
        session:ped.session.usuario ? ped.session.usuario:null,
        flash:ped.flash("mensaje")
    })
})

router.post('/NewUser',async function(ped,res){

    var NewUser = new Usuario({
        nombre:ped.body.Nombre,
        contrasena:ped.body.Contraseña,
        email:ped.body.Email
    })
    await NewUser.save()

    ped.session.usuario=NewUser._id;
    ped.flash("mensaje",`Se ha registrado correctamente ${NewUser.nombre}`)

    res.redirect("/");
})

router.post("/FindUser",async function(ped,res){

    var User = await Usuario.findOne({
        email:ped.body.Email,
        contrasena:ped.body.Contraseña
    })

    if(User){
        ped.session.usuario=User._id;
        ped.flash("mensaje",`Bienvenido ${User.nombre}`)

        res.redirect("/")
    }else{
        res.redirect("/")
    }



})

router.get('/BuyPhone/:id',async function(ped,res){

    var usuario= await Usuario.findOne({_id:ped.session.usuario});
    usuario.Telefono.push(ped.params.id)
    usuario.save();


    ped.flash("mensaje",`Compra realizada correctamente`)
    res.redirect("/");

})

router.get("/CerrarSession",function(ped,res){
    ped.session.destroy();
    res.redirect('/')
})




module.exports=router