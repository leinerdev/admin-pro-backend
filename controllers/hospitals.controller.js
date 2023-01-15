const { request, response } = require("express");
const Hospital = require('../models/hospital.model');

const getHospitals = async (req = request, res = response) => {

    const hospitals = await Hospital.find().populate('user', 'name img')

    res.json({
        ok: true,
        hospitals
    })
}

const createHospital = async (req = request, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        user: uid,
        ...req.body
    });

    try {
        const hospitalDB = await hospital.save();
        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const updateHospital = async (req = request, res = response) => {
    
    const id = req.params.id;
    const uid = req.uid;
    
    try {
        const hospital = await Hospital.findById(id);
        if(!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id',
            });
        }

        const hospitalChanges = {
            ...req.body,
            user: uid
        }

        const updatedHospital = await Hospital.findByIdAndUpdate(id, hospitalChanges, { new: true });
        res.status(200).json({
            ok: true,
            msg: 'Hospital actualizado',
            updatedHospital
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }
}

const deleteHospital = async (req = request, res = response) => {
    const id = req.params.id;
    
    try {
        const hospital = await Hospital.findById(id);
        if(!hospital) {
            return res.status(404).json({
                ok: true,
                msg: 'Hospital no encontrado por id',
            });
        }
        await Hospital.findByIdAndDelete(id)
        res.status(200).json({
            ok: true,
            msg: 'Hospital eliminado',
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
    getHospitals,
    createHospital,
    updateHospital, 
    deleteHospital
}