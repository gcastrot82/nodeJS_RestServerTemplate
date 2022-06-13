
const { Router } = require('express');
const { check } = require('express-validator');
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete,validarusuarioPut } = require('../controllers/user.controller');
const { esRolValido, existeCorreo, existeUsuarioPorId } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar--campos');



const router = Router();


router.get("/", usuarioGet);

router.put("/:usuarioId",[
    check('usuarioId','No es un ID valido').isMongoId(),
    check('usuarioId').custom( existeUsuarioPorId ),
    check('rol').custom( esRolValido ),
    validarCampos

] ,usuarioPut );
// router.put('*',validarusuarioPut)


// Usar middlewares para hacer las validaciones con el espress-validator

router.post("/",[
    
    // check prepara los errores
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password es obligatorio debe ser mas de 6 digitos').isLength({min:6}).not().isEmpty(),
    check('correo','El correo no es válido').isEmail(),

    check('correo').custom( existeCorreo ),
    // check('rol','No es un rol permitido').isIn(['ADMIN_ROLE','USER_ROLE']),
    
    
    // check('rol').custom( (rol) => esRolValido(rol) ),
    // Otra forma a la linea anterior
    check('rol').custom( esRolValido ),

    validarCampos
] ,usuarioPost);


router.delete("/:id",[
    check('id','No esun ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),

    validarCampos
] ,usuarioDelete);




module.exports = router;

