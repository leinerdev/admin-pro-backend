/*
    Ruta: /api/uploads/
*/

const { Router } = require('express');
const { fileUpload } = require('../controllers/uploads.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const expressFileUpload = require('express-fileupload'); 

const router = Router();

router.use(expressFileUpload())
router.post('/:table/:id', validateJWT, fileUpload);

module.exports = router;