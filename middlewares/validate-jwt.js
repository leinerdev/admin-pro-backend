const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const User = require('../models/user.model')

const validateJWT = (req = request, res = response, next) => {
  // Leer el token
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la petición",
    });
  }

  // Verificar JWT
  try {
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    return res.status(401).json({
        ok: false,
        msg: "Token no válido"
    });
  }
};

const validateAdminRole = async (req, res, next) => {
  const uid = req.uid;

  try {
    const userDB = await User.findById(uid)
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'El usuario no existe'
      });
    }
    if (userDB.role !== "ADMIN_ROLE") {
      return res.status(403).json({
        ok: false,
        message: 'No tiene privilegios para hacer eso'
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Hable con el administrador'
    })
  }
}

const validateAdminRoleOrSameUser = async (req, res, next) => {
  const uid = req.uid;
  const id = req.params.id;

  try {
    const userDB = await User.findById(uid)
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        message: 'El usuario no existe'
      });
    }
    if (userDB.role === "ADMIN_ROLE" || uid === id) {
      next();
    } else {
      return res.status(403).json({
        ok: false,
        message: 'No tiene privilegios para hacer eso'
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      message: 'Hable con el administrador'
    })
  }
}

module.exports = {
  validateJWT,
  validateAdminRole,
  validateAdminRoleOrSameUser
};
