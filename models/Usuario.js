var mongose=require('mongoose');
require('mongoose-type-email');


var Usuario= new mongose.Schema({
    nombre:"string",
    contrasena:{type:"string",required:true},
    email:{
        type:mongose.SchemaTypes.Email,
        required:true
    },
    Telefono:[{
                type:mongose.Schema.Types.ObjectId ,
                ref:"Telefono"}]
})


module.exports=mongose.model("Usuario",Usuario);