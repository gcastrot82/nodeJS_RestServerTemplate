
const {Schema, model} = require('mongoose');

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required: [true,'El nombre es obligatorio']
    },
    correo:{
        type: String,
        required: [true,'El correo es obligatorio'],
        unique:true
    },
    password:{
        type: String,
        required: [true,'La contraseña es obligatoria']
    },
    img:{
        type: String,

    },
    rol:{
        type: String,
        required: true,
        enum:['ADMIN_ROLE','USER_ROLE']
    },
    estado:{
        type: Boolean,
        default: true
        
    },
    google:{
        type: Boolean,
        default:false
    },

});


// Sobreescribir metodos de mongoose , debe ser una funcion normal
// separo los atributos que no quiero y el resto lodejo en la variable usuario

UsuarioSchema.methods.toJSON = function(){
    const {__v,password, ... usuario} = this.toObject();
    return usuario;

}

module.exports = model('Usuario', UsuarioSchema)