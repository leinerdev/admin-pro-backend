const jwt = require('jsonwebtoken');

const generateJWT = (uid, name) => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid,
            name
        }
    
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '12h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('No se pudo generar el JWT');
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generateJWT
}