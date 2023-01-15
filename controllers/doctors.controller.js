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

const updateDoctor = async (req = request, res = response) => {
    const id = req.params.id;
    const uid = req.uid;
    
    try {
        const doctor = await Doctor.findById(id);
        if(!doctor) {
            return res.status(404).json({
                ok: true,
                msg: 'Médico no encontrado por id',
            });
        }

        const doctorChanges = {
            ...req.body,
            user: uid
        }

        const updatedDoctor = await Doctor.findByIdAndUpdate(id, doctorChanges, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Médico actualizado',
            updatedDoctor
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const deleteDoctor = async (req = request, res = response) => {
    const id = req.params.id;
    
    try {
        const doctor = await Doctor.findById(id);
        if(!doctor) {
            return res.status(404).json({
                ok: true,
                msg: 'Médico no encontrado por id',
            });
        }
        await Doctor.findByIdAndDelete(id)
        res.status(200).json({
            ok: true,
            msg: 'Médico eliminado',
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

module.exports = {
    getDoctors,
    createDoctor,
    updateDoctor, 
    deleteDoctor
}