const { request, response } = require("express");
const Doctor = require('../models/doctor.model');

const getDoctors = async (req = request, res = response) => {

    const doctors = await Doctor.find().populate('user', 'name img').populate('hospital', 'name img')

    res.json({
        ok: true,
        doctors
    })
}

const createDoctor = async (req = request, res = response) => {

    const uid = req.uid;
    const doctor = new Doctor({
        user: uid,
        ...req.body
    });

    try {
       const doctorDB = await doctor.save(); 
        res.json({
            ok: true,
            doctor: doctorDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error interno, hable con el desarrollador Leiner Barrios'
        });
    }
}

const updateDoctor = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'updateDoctor'
    })
}

const deleteDoctor = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteDoctor'
    })
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor, 
    deleteDoctor
}