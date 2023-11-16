import Flight from '../models/flight.js';

const flightControllers = {
    addFlight: async (req, res) => {
        try {
            const {
                flight_number,
                airline,
                departure_city,
                departure_airport,
                arrival_city,
                arrival_airport,
                departure_time,
                arrival_time,
                duration,
                price
            } = req.body;
            const requiredFields = [
                'flight_number',
                'airline',
                'departure_city',
                'departure_airport',
                'arrival_city',
                'arrival_airport',
                'departure_time',
                'arrival_time',
                'duration',
                'price'
            ];

            const isValidRequest = requiredFields.every(
                (field) => req.body[field] !== undefined
            );
            if (!isValidRequest) {
                return res.status(400).json({
                    success: false,
                    err: 'Please add the required data'
                });
            }
            const newFlight = await Flight.create({
                flight_number,
                airline,
                departure_city,
                departure_airport,
                arrival_city,
                arrival_airport,
                departure_time,
                arrival_time,
                duration,
                price
            });
            return res.status(201).json(newFlight);
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: err.message || 'Error while adding a flight'
            });
        }
    },
    getFlights: async (req, res) => {
        try {
            const result = await Flight.find();
            return res.status(200).json({ success: true, result });
        } catch (err) {
            return res
                .status(500)
                .json({ success: false, err: 'Failed to retrieve flights' });
        }
    },
    getFlightByNumber: async (req, res) => {
        try {
             const { flight_number } = req.params;
            const result = await Flight.findOne({flight_number});
            return res.status(200).json({ success: true, result });
        } catch (err) {
            return res
                .status(500)
                .json({ success: false, err: `Failed to retrieve flight number ${flight_number}` });
        }
    },
    getFlightFromTo: async (req, res) => {
        try {
            const { departure_city, arrival_city } = req.query;
            if (!departure_city || !arrival_city) {
                return res.status(400).json({
                    success: false,
                    error: 'Please provide both departure_city and arrival_city in the query parameters.'
                });
            }
            const result = await Flight.find({
                departure_city,
                arrival_city
            });

            if (result.length > 0) {
                return res.status(200).json({ success: true, result: result });
            } else {
                return res
                    .status(404)
                    .json({ success: false, error: 'Flights are not found' });
            }
        } catch (err) {
            return res
                .status(500)
                .json({ success: false, err: 'Failed to retrieve flights' });
        }
    },
    updateFlight: async (req, res) => {
        try {
            const { flight_number } = req.params;
            const {
                airline,
                departure_city,
                departure_airport,
                arrival_city,
                arrival_airport,
                departure_time,
                arrival_time,
                duration,
                price
            } = req.body;
            const requiredFields = [
                'airline',
                'departure_city',
                'departure_airport',
                'arrival_city',
                'arrival_airport',
                'departure_time',
                'arrival_time',
                'duration',
                'price'
            ];
            const isValidRequest = requiredFields.some(
                (field) =>
                    req.body[field] !== undefined && req.body[field] !== null
            );

            if (!isValidRequest) {
                return res.status(400).json({
                    success: false,
                    err: 'Please add the required data'
                });
            }

            // Create an object with only the fields that have values in req.body
            const updatedFields = {};
            requiredFields.forEach((field) => {
                if (req.body[field] !== undefined && req.body[field] !== null) {
                    updatedFields[field] = req.body[field];
                }
            });

            const updatedFlight = await Flight.updateOne(
                { flight_number: flight_number },
                { $set: updatedFields }
            );

            if (updatedFlight.modifiedCount > 0) {
                res.status(200).json({
                    success: true,
                    message: 'Flight has been updated successfully'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: 'Flight was not found for update'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: 'Failed to update recipe'
            });
        }
    },
    deleteFlight: async (req, res) => {
        try {
            const { flight_number } = req.params;
            const result = await Flight.deleteOne({
                flight_number: flight_number
            });
            if (result.deletedCount > 0) {
                res.status(200).json({
                    success: true,
                    message: `The flight number ${flight_number} has been deleted successfully`
                });
            } else {
                res.status(404).json({
                    success: false,
                    err: 'The flight has not been found for deletion'
                });
            }
        } catch (err) {
            return res.status(500).json({
                success: false,
                err: 'Failed to delete the flight'
            });
        }
    }
};

export default flightControllers;
