const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const deviceSchema = new Schema({
    name: {
        type: String,
    },
    timeRequest: {
        type: String,
    },
    expiryDate: {
        type: Number, // Changed to store epoch time
        default: Date.now // Removed parentheses to store function reference
    },
    key: {
        type: String,
    },
    productType: {
        type: String,
        required: true
    },
    serial: {
        type: String,
        required: true
    },
    seid: {
        type: String,
        required: true
    },
    hasKey: {
        type: Boolean,
    }
}, {
    timestamps: true // This will add createdAt and updatedAt fields automatically
});

// Create the Device model
const Device = mongoose.model('Device', deviceSchema);

module.exports = Device;
