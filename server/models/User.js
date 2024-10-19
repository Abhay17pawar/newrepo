const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    role: { type: String, enum: ['patient', 'nurse'], required: true },
    verificationID: { type: String },
    latitude: { type: Number }, // For storing geocoded latitude
    longitude: { type: Number } // For storing geocoded longitude
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
