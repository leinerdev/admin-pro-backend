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
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

Doctorchema.method('ToJSON', function() {
    const { __v, ...object } = this.toObject();
    return object;
});

module.exports = model('Doctor', Doctorchema);