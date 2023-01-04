const { response, request } = require("express");
const User = require('../models/user.model');
const bcryptjs = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: 'Credenciales incorrectas'
      });
    }

    // Verificar contraseña
    const validPassword = bcryptjs.compareSync( password, userDB.password );
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: 'Credenciales incorrectas'
      });
    }

    // Generar el JWT
    const token = await generateJWT(userDB.id, userDB.name);

    res.json({
      ok: true,
      token
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, comuníquese con el adminsitrador",
    });
  }
};

module.exports = {
  login,
};
