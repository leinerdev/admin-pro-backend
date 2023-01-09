const User = require("../models/user.model");
const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const { generateJWT } = require('../helpers/jwt');

const getUsers = async (req, res) => {
  const from = Number(req.query.from) || 0; 

  // const users = await User.find({}, "name email role google").skip(from).limit(5);
  // const total = await User.count(); 

  const [ users, total ] = await Promise.all([
    User.find({}, "name email role google img").skip(from).limit(5),
    User.countDocuments(), 
  ]);

  res.status(200).json({
    ok: true,
    users,
    uid: req.uid,
    total
  });
};

const createUsers = async (req = request, res = response) => {
  const { email, password } = req.body;

  try {
    // Validar correo
    const existEmail = await User.findOne({ email });
    if (existEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya está registrado",
      });
    }
    const user = new User(req.body);

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password, salt);

    // Guardar usuario
    await user.save();

    // Generar JWT
    const token = await generateJWT(user.id, user.name);

    res.status(200).json({
      ok: true,
      user,
      token
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado, comunícate con el desarrollador",
    });
  }
};

const updateUser = async (req, res) => {
  const uid = req.params.id;

  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese ID",
      });
    }

    // TODO: Validar token y comprobar si es el usuario correcto
    // ------------------------------------------------------ //

    // Actulizar el usuario
    const { password, google, email, ...fields } = req.body;
    if (userDB.email !== email) {
      const existEmail = await User.findOne({ email });
      if (existEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese Email",
        });
      }
    }

    fields.email = email;
    const updatedUser = await User.findByIdAndUpdate(uid, fields, {
      new: true,
    });
    res.status(200).json({
      ok: true,
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error inesperado",
    });
  }
};

const deleteUser = async (req = request, res = response) => {
  const uid = req.params.id;
  try {
    const userDB = await User.findById(uid);
    if (!userDB) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un usuario con ese ID",
      });
    }

    await User.findByIdAndDelete(uid);
    res.status(200).json({
      ok: true,
      msg: 'Usuario eliminado'
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      ok: false,
      msg: "Error inesperado, comuníquese con el administrador",
    });
  }
};

module.exports = {
  getUsers,
  createUsers,
  updateUser,
  deleteUser,
};
