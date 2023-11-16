import mongoose from 'mongoose';

const flightSchema = new mongoose.Schema({
    flight_number: {
        type: String,
        require: true,
        unique:true
    },
    airline: {
        type: String,
        require: true
    },
    departure_city: {
        type: String,
        require: true
    },
    departure_airport: {
        type: String,
        require: true
    },
    arrival_city: {
        type: String,
        require: true
    },
    arrival_airport: {
        type: String,
        require: true
    },
    departure_time: {
        type: Date,
        default: Date.now,
        require: true
    },
    arrival_time: {
        type: Date,
        default: Date.now,
        require: true
    },
    duration: {
        type: Number,
        require: true
    },
    price: {
        type: Number,
        require: true
    }
});

export default mongoose.model('Flight', flightSchema);
