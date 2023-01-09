const { request, response } = require('express');
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require('../helpers/update-image');

const fileUpload = (req = request, res = response) => {

    const type = req.params.table;
    const id = req.params.id;

    // Validar tipo
    const allowedTypes = ['hospitals', 'doctors', 'users'];
    if (!allowedTypes.includes(type)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es un médico, usuario u hospital.'
        });
    }

    // Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'No hay ningún archivo.'
        })
    }

    // Procesar la imagen
    const file = req.files.imagen;

    const nameCuted = file.name.split('.'); 
    const extensionFile = nameCuted[nameCuted.length - 1];


    // Validar extensión
    const validExtension = ['png', 'jpg', 'jpeg', 'gif'];
    if (!validExtension.includes(extensionFile)) {
        return res.status(400).json({
            ok: false,
            msg: 'No es una extensión permitida'
        });
    }

    // Generar el nombre del archivo
    const fileName = `${uuidv4()}.${extensionFile}`;

    // Crear el path para guardar la imagen
    const path = `./uploads/${type}/${fileName}`;

    // Mover la imagen
    file.mv(path, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al mover la imagen'
            })
        }
    });

    // Actualizar la base de datos
    updateImage(type, id, fileName);

    res.json({
        ok: true,
        msg: 'Archivo subido',
        fileName
    });
}

module.exports = {
    fileUpload
}