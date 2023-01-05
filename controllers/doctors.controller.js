const { request, response } = require("express");

const getDoctors = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'getDoctors'
    })
}

const createDoctor = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'createDoctor'
    })
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