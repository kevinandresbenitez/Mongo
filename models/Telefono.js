var mongose=require('mongoose');



var Telefono= new mongose.Schema({
    nombre:"string",
})


module.exports=mongose.model("Telefono",Telefono);