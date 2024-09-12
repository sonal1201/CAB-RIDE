const redisClient = require('../utils/redisClient');


class locationService {
    async setDriverSocket(driverId, socketId) {
        await redisClient.set(`driver:${driverId}`, socketId)
    }

    async getDriverSocket(driverId) {
        await redisClient.get(`driver:${driverId}`)
    }

    async deleteDriverSocket(driverId) {
        await redisClient.del(`driver:${driverId}`)
    }

    async addDriverLoaction(driverId, latitude, longitude) {
        try {
            await redisClient.sendCommand([
                'GEOADD',
                'driver',
                latitude.toString(),
                longitude.toString(),
                driverId.toString(),
            ])
        }
        catch (error) {
            console.log("Cannot connect to Redis", error);
        }
    }

    async findNearByDriver(latitude, longitude, radiusKm) {
        const nearByDriver = await redisClient.sendCommand([
            'GEORADIUS',
            'driver',
            latitude.toString(),
            longitude.toString(),
            radiusKm.toString(),
            'km',
            'WITHCOORD'

        ])
        return nearByDriver;
    }

    async storeNotifiedDrivers(bookingId, driverIds) {

        for (const driverId of driverIds) {
            await redisClient.sAdd(`notifiedDrivers:${bookingId}`, driverId);
        }

    }

    async getNotifiedDrivers(bookingId) {
        return await redisClient.sMembers(`notifiedDrivers:${bookingId}`)
    }

}

module.exports = new locationService();