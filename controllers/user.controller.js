const { response, request } = require('express');

const usuarioGet= (req = request, res= response) => {

  // Traer los datos completos
  // const query = req.query;

  //  Desestructurar para traer lo que necesito, adicional si no viene el dato le puedo poner un valor por defecto - No name
  const {q, nombre='No name',apiKey} = req.query


    res.json({
      isOk: true,
      message: "get API - desde Controlador",
      // query
      q,
      nombre,
      apiKey
    });
  }

// Extraer información
const usuarioPost =  (req = request, res = response) => {

    // const body = req.body;
    const {nombre, cargo} = req.body;

    res.json({
      isOk: true,
      message: "post API - desde controlador",
      nombre
    });
    console.log(cargo)
  }

const usuarioPut = (req = request, res = response) => {

    const usuarioId = req.params.usuarioId


    res.json({
      isOk: true,
      message: "put API - desde controlador",
      usuarioId
    });
  }

// const usuarioPatch = 


const usuarioDelete = (req = request, res = response) => {
    res.json({
      isOk: true,
      message: "delete API - desde controlador",
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