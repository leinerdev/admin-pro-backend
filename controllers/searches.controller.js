const { response, request } = require("express");

const User = require("../models/user.model");
const Hospital = require("../models/hospital.model");
const Doctor = require("../models/doctor.model");

const getAll = async (req = request, res = response) => {
  const search = req.params.param;
  const regex = new RegExp(search, "i"); // Hacer la búsqueda insensible

  try {
    // const users     = await User.find({ name: regex });
    // const hospitals = await Hospital.find({ name: regex });
    // const doctors   = await Doctor.find({ name: regex });

    const [users, hospitals, doctors] = await Promise.all([
      User.find({ name: regex }),
      Hospital.find({ name: regex }),
      Doctor.find({ name: regex }),
    ]);

    res.status(200).json({
      ok: true,
      users,
      doctors,
      hospitals,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Error interno, hable con el desarrollador.",
    });
  }
};

const getAllByTable = async (req = request, res = response) => {
  const table = req.params.table;
  const search = req.params.param;
  const regex = new RegExp(search, "i"); // Hacer la búsqueda insensible

  let data = [];

  switch (table) {
    case "doctors":
      data = await Doctor.find({ name: regex }).populate('user', 'name img').populate('hospital', 'name img')
      break;

    case "users":
      data = await User.find({ name: regex });
      break;

    case "hospitals":
      data = await Hospital.find({ name: regex }).populate('user', 'name img')
      break;

    default:
      return res.status(400).json({
        ok: false,
        msg: "La tabla tiene que ser user, doctor o hospital",
      });
    }
    
    res.status(200).json({
      ok: true,
      results: data,
    });
};

module.exports = {
  getAll,
  getAllByTable,
};
