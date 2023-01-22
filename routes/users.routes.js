/*
    Ruta: /api/users
*/
const { Router } = require('express');
const { body } = require('express-validator');
const { getUsers, createUsers, updateUser, deleteUser } = require('../controllers/users.controller');
const { validateFields } = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares/validate-jwt');

const router = Router();

router.get('/', validateJWT, getUsers);

router.post('/', [
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    body('password', 'El password es obligatorio').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    validateFields,
], createUsers);

router.put('/:id', [
    validateJWT,
    body('name', 'El nombre es obligatorio').not().isEmpty(),
    body('email', 'El email es obligatorio').isEmail(),
    body('role', 'El role es obligatorio').not().isEmpty(),
    validateFields
], updateUser);

router.delete('/:id', validateJWT, deleteUser);

module.exports = router;