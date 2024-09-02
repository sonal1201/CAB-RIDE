const express = require('express');
const dotenv = require('dotenv');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose')
const socketIo = require('socket.io')
const { redisClient } = require('./utils/redisClient')

const bookingRoutes = require('./routes/bookingRoutes');
const passengerRoutes = require('./routes/passengerRoutes');
const authRoutes = require('./routes/authRoutes');
const driverRoutes = require('./routes/driverRoutes');

dotenv.config();

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

mongoose.connect(process.env.MONGO_URL, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
})

app.use('/api/auth', authRoutes);
//app.use('/api/bookings', bookingRoutes(io));
app.use('/api/drivers', driverRoutes);
//app.use('/api/passengers', passengerRoutes(io));

server.listen(process.env.PORT, () => {
    console.log(`Server running on port${process.env.PORT} `);
})

redisClient.on('connect', () => {
    console.log('Connected to Reddis')
})