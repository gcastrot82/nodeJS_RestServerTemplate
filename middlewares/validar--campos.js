
const { response, request } = require('express');
const {validationResult} = require('express-validator')


//  un middleware tiene un tercer argumento next para que siga con la validación
const validarCampos = (req, res, next) =>{

    const errors = validationResult(req);

    if (!errors.isEmpty()){
      return res.status(400).json(errors)
    }


    next();
}


module.exports = {
    validarCampos

}