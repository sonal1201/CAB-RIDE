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

}

module.exports = new locationService();