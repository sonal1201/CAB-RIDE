const express = require('express');
const { getPassengerBookings, provideFeedback } = require('../controllers/passengerController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

module.exports = (io) => {
    router.get('/bookings', authMiddleware, getPassengerBookings);
    router.post('/feedback', authMiddleware, provideFeedback)

    return router;
}
