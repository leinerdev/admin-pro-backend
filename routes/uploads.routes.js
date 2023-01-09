/*
    Ruta: /api/uploads/
*/

const { Router } = require('express');
const { fileUpload, returnImage } = require('../controllers/uploads.controller');
const { validateJWT } = require('../middlewares/validate-jwt');
const expressFileUpload = require('express-fileupload'); 

const router = Router();

router.use(expressFileUpload())
router.post('/:table/:id', validateJWT, fileUpload);
router.get('/:table/:img', validateJWT, returnImage);

module.exports = router;