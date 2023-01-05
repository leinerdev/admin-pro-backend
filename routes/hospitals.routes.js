/*
    Ruta: /api/hospitals
*/
const { Router } = require('express');
const { body } = require('express-validator');
const { getHospitals, createHospital, updateHospital, deleteHospital } = require('../controllers/hospitals.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getHospitals);

router.post('/', [], createHospital);

router.put('/:id', [], updateHospital);

router.delete('/:id', deleteHospital);

module.exports = router;