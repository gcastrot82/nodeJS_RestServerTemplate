const Rol = require('../models/rol')
const Usuario = require('../models/usuario');

const esRolValido = async (rol = '') =>{

    const existeRol = await Rol.findOne({rol});

    if (!existeRol){
        
        throw new Error(`El rol ${rol} no está registrado en la BD`)
            

    }

}


const existeCorreo = async (correo='')=>{

const existeEmail = await Usuario.findOne({ correo }) // es lo mismo que decir correo==correo

    if (existeEmail){

        throw new Error(`El email: ${correo} ya existe`)
    }

}



const existeUsuarioPorId = async (usuarioId='')=>{

    const existeUsuario = await Usuario.findById(usuarioId) // es lo mismo que decir correo==correo
    
        if (!existeUsuario){
    
            throw new Error(`El Id: ${usuarioId} NO existe`)
        }
    
    }

module.exports = {
    esRolValido,
    existeCorreo,
    existeUsuarioPorId
}