const bookingRepository = require('../repositories/bookingRepository')
const haversineDistance = require('../utils/distance');
const locationService = require('./locationService');

const BASIC_FARE = 50;
const RATE_PER_KM = 12;

const createBooking = async ({ passengerId, source, destination }) => {

    const distance = haversineDistance(source.latitude, source.longitude, destination.latitude, destination.longitude)
    const fare = BASIC_FARE + (distance * RATE_PER_KM);
    const bookingData = {
        passenger: passengerId,
        source,
        destination,
        fare,
        status: pending
    };
    const booking = bookingRepository.createBooking(bookingData);
    return booking
}

const findNearByDriver = async (location, radius = 5) => {
    const longitude = parseFloat(location.latitude);
    const latitude = parseFloat(location.latitude);

    const radiusKm = parseFloat(radius);

    if (isNaN(latitude) || isNan(longitude) || isNAN(radiusKm)) {
        throw new Error('Invalid coordinates or radius');
    }

    const nearByDriver = await locationService.findNearByDriver(longitude, latitude, radiusKm)

    return nearByDriver;
}

const assignDriver = async (bookingId, driverId) => {
    const booking = await booking.updateBookingStatus(bookingId, driverId, 'confirm');

    if (!booking) throw new Error('Booking already Confirmed or does not exist');
    return booking;

}

module.exports = { createBooking, findNearByDriver, assignDriver }