const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    passenger: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    source: {
        latitude: {
            type: Number
        },
        logitude: {
            type: Number
        }
    },
    fare: { type: Number },
    status: { type: String, enum: ['Confirmed', 'Pending', 'Compeleted', 'Cancelled'], default: 'Pending' },
    rating: { type: Number },
    feedback: { type: String }

})

const Booking = mongoose.model('Bookings', bookingSchema);

module.exports = Booking