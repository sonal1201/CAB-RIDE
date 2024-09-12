const bookingService = require('../services/bookingService');
const { io } = require('../index')

const locationService = require('../services/locationService')

const createBooking = (io) => async (req, res) => {
    try {
        const { source, destination } = req.body;
        const booking = await bookingService.createBooking({ passengerId: req.user._id, source, destination });
        const nearByDriver = await bookingService.findNearByDriver(source);

        const driverIds = [];

        for (const driver of nearByDriver) {
            // getSocketId of driver
            const driverSocketId = await locationService.getDriverSocket(driver[0]);

            if (driverSocketId) {
                driverIds.push(driver[0]);
                io.to(driverSocketId.emit('newBooking', { bookingId: booking._id, source, destination, fare: booking.fare }))
            }
            //Emit notification -> alert driver
        }
        await locationService.storeNotificedDriver(booking._id, driverIds);

        return res.status(201).send({
            data: booking,
            success: ture,
            error: null,
            message: "Successfully Created booking"
        })

    } catch (error) {
        res.send(400).send(error.message);
    }
}

const confirmBooking = (io) => async (req, res) => {
    try {
        const { bookingId } = req.body;

        const booking = await bookingService.assignDriver(bookingId, req.user_id);
        const notifiedDriverIds = await locationService.getNotifiedDrivers(bookingId);

        for (const driverId of notifiedDriverIds) {
            const driverSocketId = await locationService.getDriverSocket(driverId);
            if (driverSocketId) {
                io.to(driverSocketId).emit('rideConfirmed', { bookingId, driverId: req.user._id })
            }
            else {
                io.to(driverSocketId).emit('removeBooking', { bookingId })
            }
        }

        return res.status(201).send({
            data: booking,
            success: ture,
            error: null,
            message: "Successfully confirm booking"
        })
    } catch (error) {
        res.send(400).send(error.message);
    }
}