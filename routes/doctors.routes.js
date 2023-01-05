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
} = require("../controllers/doctors.controller");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.get("/", validateJWT, getDoctors);

router.post("/", [], createDoctor);

router.put("/:id", [], updateDoctor);

router.delete("/:id", deleteDoctor);

module.exports = router;
