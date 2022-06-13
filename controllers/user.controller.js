const { response, request } = require('express');



const bcrypstjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { existeCorreo } = require('../helpers/db-validators');

const usuarioGet= async (req = request, res= response) => {

  // Traer los datos completos
  // const query = req.query;

  //  Desestructurar para traer lo que necesito, adicional si no viene el dato le puedo poner un valor por defecto - No name
  // const {q, nombre='No name',apiKey} = req.query

  // Desdestructurar de los arquimentos que vienen desde la request.query:

  const { limite = 5, desde = 0 } = req.query;

  const query = {estado:true}
  // Traer todos los usuarios
  // const usuarios = await Usuario.find(query)
  // .skip(Number(desde))
  // .limit(Number(limite));

  // const totalRegistros = await Usuario.countDocuments(query);

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments(query),
    Usuario.find(query)
    .skip(Number(desde))
    .limit(Number(limite))

  ]);

    res.json({
      // isOk: true,
      // message: "get API - desde Controlador",
      // query
    //   q,
    //   nombre,
    //   apiKey
    // usuarios,
    // totalRegistros
    total,
    usuarios
     });
  }

// Extraer información
const usuarioPost =  async (req = request, res = response) => {


    // Vamos a desestructurar el body para recibir solamente los datos que queremos

    const { nombre , correo, password, rol } = req.body;

    // Creo la instancia
    const usuario = new Usuario( { nombre , correo, password, rol } );

    // Paso1: Verificar si el correo existe

   // const existeEmail = existeCorreo(correo);

  


    // Paso2: encriptar la contraseña - se usa el motodo salt para indicarle el numero de vueltas que debe hacer para cifrar la clave
    const salt = bcrypstjs.genSaltSync(10);

    // Hacer le hash de la clave - hashsync es para cifrar en una sola via
    usuario.password = bcrypstjs.hashSync(password, salt)
    

    // Grabo el registro
    await usuario.save();



    res.json({
      // isOk: true,
      // message: "post API - desde controlador",
      // nombre,
      // cargo
      // body
      usuario
    });
    console.log(usuario)
  }

const usuarioPut = async (req = request, res = response) => {

    // const usuarioId = req.params.usuarioId
    const { usuarioId } = req.params;


    const { _id, password, google, ... resto} = req.body;


        //  Validar contra BD
    if(password){
      // Paso2: encriptar la contraseña - se usa el motodo salt para indicarle el numero de vueltas que debe hacer para cifrar la clave
      const salt = bcrypstjs.genSaltSync(10);
      // Hacer le hash de la clave - hashsync es para cifrar en una sola via
      resto.password = bcrypstjs.hashSync(password, salt)
    }


    const usuarioDB = await Usuario.findByIdAndUpdate( usuarioId, resto )



    res.json({
      // isOk: true,
      // message: "put API - desde controlador",
      usuarioDB
    });
  }

// const usuarioPatch = 


const usuarioDelete = async (req = request, res = response) => {

  const { id } = req.params;

  // Borrado fisico de usuario en BD
  // const usuario = await Usuario.findByIdAndDelete( id );

  // borrado por cambi ode valor en estado
  const usuario = await Usuario.findByIdAndUpdate(id, {estado:false} );

    res.json({
      // isOk: true,
      // message: "delete API - desde controlador",
    usuario
    });
  }


  const validarusuarioPut = (req = request, res=response) =>{

    res.send("404 | Page Not found")


  }
module.exports = {
    usuarioGet,
    usuarioPost,
    usuarioPut,
    usuarioDelete,
    validarusuarioPut
}