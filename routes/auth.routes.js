/*
    Ruta: /api/auth
*/
const { Router } = require('express');
const { body } = require('express-validator');
const { login, loginWithGoogle, renewToken } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.post('/', [
    body('email', 'El email es obligatorio').isEmail(),
    body('password', 'El password es obligatorio').not().isEmpty(),
    validateFields
], login);

router.post('/google', [
    body('token', 'El token de Google es obligatorio').not().isEmpty(),
    validateFields
], loginWithGoogle);

router.get('/renew', [
    validateJWT
], renewToken);

module.exports = router;