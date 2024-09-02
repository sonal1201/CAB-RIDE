const bookingRepository = require('../repositories/bookingRepository');
const passengerRepository = require('../repositories/passengerRepository')

const getPassengerBookings = async (passengerId) => {

    try {
        const passengerDetails = passengerRepository.findPassengerById(passengerId);
        if (!passengerDetails) throw new Error("Passenger Not Found")
        return passengerDetails;
    } catch (error) {

    }

    passenngerRepository.findPassengerById(passengerId);
    if (!passen)
}

const provideFeedback = async (passengerId, bookingId, rating, feedback) => {
    const booking = await bookingRepository.findBooking({ _id: bookingId, passenger: passengerId })

    if (!booking) throw new Error('Booking Not Found');

    booking.rating = rating;
    booking.feedback = feedback;

    await booking.save();

}

module.exports = { getPassengerBookings, provideFeedback }