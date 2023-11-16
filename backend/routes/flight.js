import express from 'express';

const router = express.Router();

import flightControllers from '../controllers/flight.js';
import verifyToken from '../middleware/verifyToken.js';

// routes
router.get('/', flightControllers.getFlights);
router.get(
    '/search',
    flightControllers.getFlightFromTo
);
router.get('/search/:flight_number', flightControllers.getFlightByNumber);
router.post('/add-flight', verifyToken, flightControllers.addFlight);
router.put('/update-fight/:flight_number', verifyToken, flightControllers.updateFlight);
router.delete(
    '/delete-fight/:flight_number',
    verifyToken,
    flightControllers.deleteFlight
);
export default router;
