/*
    Ruta: /api/auth
*/
const { Router } = require('express');
const { body } = require('express-validator');
const { login } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');

const router = Router();

router.post('/', [
    body('email', 'El email es obligatorio').isEmail(),
    body('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], login);

module.exports = router;