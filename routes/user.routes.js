
const { Router } = require('express');
const { usuarioGet, usuarioPut, usuarioPost, usuarioDelete,validarusuarioPut } = require('../controllers/user.controller');

const router = Router();


router.get("/", usuarioGet);

router.put("/:usuarioId", usuarioPut );
router.put('*',validarusuarioPut)

router.post("/", usuarioPost);


router.delete("/", usuarioDelete);




module.exports = router;

