const { response, request } = require("express");
const User = require("../models/user.model");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { googleVerify } = require("../helpers/google-verify");

const login = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Verificar email
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "Credenciales incorrectas",
      });
    }

    // Verificar contraseña
    const validPassword = bcryptjs.compareSync(password, userDB.password);
    if (!validPassword) {
      return res.status(404).json({
        ok: false,
        msg: "Credenciales incorrectas",
      });
    }

    // Generar el JWT
    const token = await generateJWT(userDB.id, userDB.name);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, comuníquese con el adminsitrador",
    });
  }
};

const loginWithGoogle = async (req = request, res = response) => {
  try {
    const { email, name, picture } = await googleVerify(req.body.token);

    const userDB = await User.findOne({ email });
    let user;
    if (!userDB) {
      user = new User({
        name,
        email,
        password: '@@@',
        img: picture,
        google: true
      })
    } else {
      user = userDB;
      user.google = true;
    }

    // Guardar usuario
    await user.save();

    // Generar el JWT
    const token = await generateJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      data: {
        email,
        name,
        picture
      },
      token,
      msg: 'Todo perfect'
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Token de Google inválido",
    });
  }
};

module.exports = {
  login,
  loginWithGoogle,
};
