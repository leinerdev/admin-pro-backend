/*
    Ruta: /api/doctors
*/
const { Router } = require("express");
const { body } = require("express-validator");
const {
  getDoctors,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorById
} = require("../controllers/doctors.controller");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getDoctors);

router.post("/", [
  validateJWT,
  body('name', 'El nombre del médico es requerido.').not().isEmpty(),
  body('hospital', 'El hospital es requerido.').not().isEmpty(),
  body('hospital', 'El hospital id debe ser válido').isMongoId(),
], createDoctor);

router.put("/:id", [
  validateJWT,
  body('name', 'El nombre del médico es requerido.').not().isEmpty(),
  body('hospital', 'El hospital es requerido.').not().isEmpty(),
  body('hospital', 'El hospital id debe ser válido').isMongoId(),
], updateDoctor);

router.delete("/:id", [
  validateJWT
], deleteDoctor);

router.get("/:id", [
  validateJWT
], getDoctorById);

module.exports = router;
