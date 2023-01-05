const { request, response } = require("express");

const getHospitals = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'getHospitals'
    })
}

const createHospital = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'createHospital'
    })
}

const updateHospital = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'updateHospital'
    })
}

const deleteHospital = (req = request, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteHospital'
    })
}

module.exports = {
    getHospitals,
    createHospital,
    updateHospital, 
    deleteHospital
}