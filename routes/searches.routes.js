/*
    Ruta: /api/all/:parámetro
*/

const { Router } = require('express');
const { getAll, getAllByTable } = require('../controllers/searches.controller');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/:param', validateJWT, getAll);
router.get('/collection/:table/:param', validateJWT, getAllByTable);

module.exports = router;