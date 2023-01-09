const { Schema, model } = require('mongoose');

const Doctorchema = Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        type: String,
    },
    user: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital: {
        required: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

Doctorchema.method('ToJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Doctor', Doctorchema);