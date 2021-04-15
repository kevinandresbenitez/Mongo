var express =require('express');
var router =express.Router();


//modelos

var Usuario =require('../models/Usuario');
var Telefono =require('../models/Telefono');



// direcciones 


router.get('/admin',async function(ped,res){
    var Users =await Usuario.find().populate("Telefono");
    var phones=await Telefono.find();

    res.render('pages/admin',{
        Users,phones,
        session:ped.session.usuario ? ped.session.usuario:null,
        flash:ped.flash("mensaje")

    })
})

router.post('/NewPhone',async function(ped,res){

    var NewPhone = new Telefono({nombre:ped.body.Phone})
    await NewPhone.save()

    ped.flash("mensaje",`Agregando celular ${NewPhone.nombre}`);
    res.redirect("/admin");
})

router.get('/DeletePhone/:id',async function(ped,res){
    var Phone = await Telefono.deleteOne({_id:ped.params.id});

    ped.flash("mensaje",`celular borrado correctamente`);
    res.redirect("/admin");
})

router.get('/DeleteUser/:id',async function(ped,res){
    var User = await Usuario.deleteOne({_id:ped.params.id});

    ped.flash("mensaje",`Usuario eliminado correctamente`);
    res.redirect("/admin");
})


module.exports = router